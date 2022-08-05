import {
	MIGRATOR_SOURCE_CHAIN_ID,
	MIGRATOR_TARGET_CHAIN_ID,
} from 'constants/migratorConfig'
import { last, uniqBy } from 'lodash'
import pMap from 'p-map'

import { TxReceipt } from 'services/blockchain/blockchain.interface'
import terraUtils from 'utils/blockchain/terraUtils'
import { keysToCamel } from 'utils/js/keysToCamel'
import { keysToSnake } from 'utils/js/keysToSnake'
import addresses, { ContractName } from 'services/blockchain/addresses'
import pMemoize from 'p-memoize'

export const LOOTOPIAN_CONTRACT = 'terra1tehe2e4ufa9n0xeef4wxvfvhncjyzetlp404wm'
export const LOOTOPIAN_ITEM_CONTRACT =
	'terra1gx478xey87dq3dz2sfdt6rfcd0snqpj83ypd3x'
export const LOOTOPIAN_ESCROW_CONTRACT =
	'terra18f3kvyggdqngyprtzsrx6ee4c3akusl7rgrw3c'
export const LOOTOPIAN_ITEM_ESCROW_CONTRACT =
	'terra1e5ljuwy9l44w04fvw9wdq7z3khwhlycpm736hm'

async function lockManyToContracts(
	destinations: {
		destinationAddress: string
		contractAddress: string
		tokenId: string
	}[]
): Promise<TxReceipt> {
	const txs = destinations.map(
		({ destinationAddress, tokenId, contractAddress }) => ({
			contractAddress,
			message: {
				send_nft: {
					contract: destinationAddress,
					token_id: tokenId,
					msg: btoa(
						JSON.stringify({
							deposit_nft: {
								token_id: tokenId,
							},
						})
					),
				},
			},
		})
	)

	return terraUtils.postManyTransactions(txs)
}

export type RegisteredTokenInfo = {
	tokenId: string
	depositor: string
}

export type RegisteredTokens = {
	tokens: RegisteredTokenInfo[]
}

// Terra classic queries
async function getUserTokens(
	contractAddress: string,
	walletAddress: string,
	limit?: number,
	startAfter?: string
): Promise<RegisteredTokens> {
	const { tokens } = await terraUtils.sendIndependentQuery(
		MIGRATOR_SOURCE_CHAIN_ID,
		contractAddress,
		{
			user_tokens: {
				user: walletAddress,
				...(limit ? { limit } : {}),
				...(startAfter ? { start_after: startAfter } : {}),
			},
		}
	)

	return {
		tokens: keysToCamel(tokens),
	}
}

async function getRegisteredTokens(
	contractAddress: string,
	limit?: number,
	startAfter?: string
): Promise<RegisteredTokens> {
	const { tokens } = await terraUtils.sendIndependentQuery(
		MIGRATOR_SOURCE_CHAIN_ID,
		contractAddress,
		{
			registered_tokens: {
				...(limit ? { limit } : {}),
				...(startAfter ? { start_after: startAfter } : {}),
			},
		}
	)

	return {
		tokens: keysToCamel(tokens),
	}
}

async function getDepositor(
	contractName: ContractName,
	tokenId: string
): Promise<string> {
	const contractAddress = addresses.getContractAddress(contractName)

	return terraUtils.sendIndependentQuery(
		MIGRATOR_SOURCE_CHAIN_ID,
		contractAddress,
		{
			depositor: {
				token_id: tokenId,
			},
		}
	)
}

// This function is only for 2.0, minter contract

async function getClaimFeePrice(minterContractAddress: string): Promise<{
	projectPrice: string
	feePrice: string
}> {
	const response = await terraUtils.sendIndependentQuery(
		MIGRATOR_TARGET_CHAIN_ID,
		minterContractAddress,
		{
			fee_price: {},
		}
	)

	return keysToCamel(response)
}

async function claimManyNFTs(
	claimRequest: {
		mintRequest: any
		signature: string
		contractAddress: string
	}[]
): Promise<TxReceipt> {
	const fees: any = Object.fromEntries(
		await pMap(
			uniqBy(claimRequest, nft => nft.contractAddress),
			async ({ contractAddress }: { contractAddress: string }) => [
				contractAddress,
				await getClaimFeePrice(contractAddress),
			],
			{
				concurrency: 5,
			}
		)
	)

	const txs = claimRequest.map(({ mintRequest, signature, contractAddress }) => {
		const totalFee =
			Number(fees[contractAddress].projectPrice) +
			Number(fees[contractAddress].feePrice)
		return {
			contractAddress,
			message: {
				mint: {
					mint_request: keysToSnake(mintRequest),
					signature,
				},
			},
			coins: {
				...(totalFee ? { luna: totalFee.toString() } : {}),
			},
		}
	})

	return terraUtils.postManyTransactions(txs)
}

// Only standard cw721 functions for Classic
async function getOwnerOfToken(
	nftContractAddress: string,
	tokenId: string
): Promise<string> {
	const response = await terraUtils.sendIndependentQuery(
		MIGRATOR_SOURCE_CHAIN_ID,
		nftContractAddress,
		{
			owner_of: {
				token_id: tokenId,
			},
		}
	)

	return response.owner
}

async function getNFTInfo(
	nftContractAddress: string,
	tokenId: string
): Promise<any> {
	const nftInfo = await terraUtils.sendIndependentQuery(
		MIGRATOR_SOURCE_CHAIN_ID,
		nftContractAddress,
		{
			nft_info: {
				token_id: tokenId,
			},
		}
	)

	return keysToCamel(nftInfo)
}

interface ContractInfo {
	name: string
}

async function getContractInfo(
	nftContractAddress: string
): Promise<ContractInfo> {
	const { name } = await terraUtils.sendIndependentQuery(
		MIGRATOR_SOURCE_CHAIN_ID,
		nftContractAddress,
		{
			contract_info: {},
		}
	)

	return {
		name,
	}
}

const memoizedGetContractInfo = pMemoize(getContractInfo)

const fetchUserTokensUntilEnd = async (
	escrowContract: string,
	userAddress: string,
	limit = 30
) => {
	let startAfter: string | undefined
	const response: RegisteredTokenInfo[][] = []

	const fetchUserTokensPart = async () => {
		const result: RegisteredTokenInfo[] =
			(await getUserTokens(escrowContract, userAddress, limit, startAfter))
				?.tokens || []

		response.push(result)

		startAfter = last(result)?.tokenId

		if (startAfter) {
			await fetchUserTokensPart()
		}
	}

	await fetchUserTokensPart()

	return response.flat()
}

async function* fetchRegisteredMigrationsUntilEnd(
	escrowContract: string,
	startAfter?: string,
	limit = 30
): AsyncGenerator<RegisteredTokenInfo[]> {
	const result: RegisteredTokenInfo[] =
		(await getRegisteredTokens(escrowContract, limit, startAfter))?.tokens || []

	yield result

	const newStartAfter = last(result)?.tokenId

	if (newStartAfter) {
		return yield* fetchRegisteredMigrationsUntilEnd(
			escrowContract,
			newStartAfter,
			limit
		)
	}

	return result
}

// Special cases
async function getLootopianItemTokenIds(tokenId: string): Promise<string[]> {
	const tokenMetadata: any = await terraUtils.sendIndependentQuery(
		MIGRATOR_SOURCE_CHAIN_ID,
		LOOTOPIAN_CONTRACT,
		{
			nft_info: {
				token_id: tokenId,
			},
		}
	)

	return (tokenMetadata?.extension?.sections || [])
		.filter(({ nft_token_id: nftTokenId }: any) => nftTokenId !== 0)
		.map(({ nft_token_id: nftTokenId }: any) => nftTokenId.toString())
}

async function* fetchLootopianItemsRegisteredMigrationsUntilEnd(): AsyncGenerator<
	{
		depositor: string
		tokenId: string
	}[]
> {
	// We start by querying the lootopians that are locked in the escrow contract
	const registeredTokens = fetchRegisteredMigrationsUntilEnd(
		LOOTOPIAN_ESCROW_CONTRACT
	)

	let result = await registeredTokens.next()

	while (!result.done) {
		// eslint-disable-next-line no-await-in-loop
		const lootopianItems = await pMap(
			result.value,
			async token => {
				// Then we query the associated items
				const tokens = await getLootopianItemTokenIds(token.tokenId)
				// Finally we return the tokenIds
				return tokens.map((itemToken: string) => ({
					depositor: LOOTOPIAN_ITEM_CONTRACT,
					tokenId: itemToken,
				}))
			},
			{ concurrency: 10 }
		)
		// eslint-disable-next-line no-await-in-loop
		yield lootopianItems.flat()

		// eslint-disable-next-line no-await-in-loop
		result = await registeredTokens.next()
	}
	return result
}

const fetchLootopianItemsUserTokensUntilEnd = async (userAddress: string) => {
	const userTokens = await fetchUserTokensUntilEnd(
		LOOTOPIAN_ESCROW_CONTRACT,
		userAddress
	)

	const lootopianItems = await pMap(
		userTokens,
		async (token: RegisteredTokenInfo) => {
			// Then we query the associated items
			const tokens = await getLootopianItemTokenIds(token.tokenId)
			// Finally we return the tokenIds
			return tokens.map((tokenId: string) => ({
				depositor: LOOTOPIAN_ITEM_CONTRACT,
				tokenId,
				lootopianTokenId: token.tokenId,
			}))
		},
		{ concurrency: 40 }
	)

	const onlyLootopianItems = await fetchUserTokensUntilEnd(
		LOOTOPIAN_ITEM_ESCROW_CONTRACT,
		userAddress
	)

	return [...lootopianItems.flat(), ...onlyLootopianItems]
}

export default {
	// Terra Classic Contract
	lockManyToContracts,
	getUserTokens,
	getRegisteredTokens,
	getDepositor,
	// Extensions
	fetchUserTokensUntilEnd,
	fetchRegisteredMigrationsUntilEnd,

	// Standard cw721
	getOwnerOfToken,
	getNFTInfo,
	getContractInfo,
	memoizedGetContractInfo,

	// Terra 2.0 Contract
	claimManyNFTs,
	getClaimFeePrice,

	// Special cases
	fetchLootopianItemsRegisteredMigrationsUntilEnd,
	fetchLootopianItemsUserTokensUntilEnd,
}
