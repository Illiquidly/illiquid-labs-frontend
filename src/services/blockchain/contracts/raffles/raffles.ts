import { NFT } from 'services/api/walletNFTsService'
import addresses from 'services/blockchain/addresses'
import { TxReceipt } from 'services/blockchain/blockchain.interface'
import terraUtils, {
	amountConverter as converter,
} from 'utils/blockchain/terraUtils'
import { keysToSnake } from 'utils/js/keysToSnake'

const amountConverter = converter.ust

export interface RawRaffleOptions {
	comment?: string
	maxParticipantNumber?: number
	maxTicketPerAddress?: number
	raffleDuration?: number
	rafflePreview?: number
	raffleStartTimestamp?: number
	raffleTimeout?: number
}

const RAFFLE = 'raffle'

async function createRaffleListing(
	nfts: NFT[],
	ticketPriceLuna: string | number,
	raffleOptions: RawRaffleOptions
): Promise<TxReceipt> {
	const p2pContractAddress = addresses.getContractAddress(RAFFLE)

	return terraUtils.postManyTransactions([
		// Add cw721 tokens to raffle
		...nfts.flatMap(({ collectionAddress, tokenId }) => [
			{
				contractAddress: collectionAddress,
				message: {
					approve: {
						spender: p2pContractAddress,
						token_id: tokenId,
					},
				},
			},
		]),
		{
			contractAddress: p2pContractAddress,
			message: {
				create_raffle: {
					assets: [
						...nfts.flatMap(({ collectionAddress, tokenId }) => [
							{
								cw721_coin: {
									token_id: tokenId,
									address: collectionAddress,
								},
							},
						]),
					],
					raffle_options: keysToSnake(raffleOptions),
					raffle_ticket_price: {
						coin: {
							amount: amountConverter.userFacingToBlockchainValue(ticketPriceLuna),
							denom: 'uluna',
						},
					},
				},
			},
		},
	])
}

export { createRaffleListing }
