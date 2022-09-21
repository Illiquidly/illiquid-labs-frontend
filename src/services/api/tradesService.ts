import { axios } from 'services/axios'
import { getParamsFromObject } from 'utils/js/getParamsFromObject'
import { NFT } from './walletNFTsService'

export type Coin = {
	amount: string
	denom: string
}

export type Cw721Coin = {
	address: string
	tokenId: string
}

export type Cw1155Coin = {
	address: string
	tokenId: string
}

export interface Trade {
	tradeId: number
	tradeInfo: {
		acceptedInfo: {
			counterId?: number
		}
		assetsWithdrawn: number
		lastCounterId?: number
		associatedAssets: [
			{
				coin?: Coin
				cw721Coin?: Cw721Coin
				cw1155Coin?: Cw1155Coin
			}
		]
		additionalInfo: {
			ownerComment: {
				comment: string
				time: string
			}
			time: string
			nftsWanted: string[]
			tokensWanted: {
				coin?: Coin
				cw721Coin?: Cw721Coin
				cw1155Coin?: Cw1155Coin
			}[]
			tradePreview: {
				coin?: Coin
				cw721Coin?: NFT
				cw1155Coin?: any // TODO define in future
			}
			traderComment: {
				comment?: string
				time?: string
			}
		}
		owner: string
		state: string
		whitelistedUsers: string[]
		associatedAssetsWithInfo: {
			coin?: Coin
			cw721Coin?: NFT
			Cw1155Coin?: any // TODO define this in future
		}[]
	}
}

export interface TradesResponse {
	data: Trade[]
	nextOffset?: number
	totalNumber: number
}

export class TradesService {
	public static async getAllTrades(network: string): Promise<TradesResponse> {
		const query = getParamsFromObject({ 'filters.network': network })

		const response = await axios.get(`trades/all?${query.toString()}`)

		return response.data
	}

	public static async getTrade(network, tradeId): Promise<Trade> {
		const query = getParamsFromObject({ 'filters.network': network, tradeId })

		const response = await axios.get(`trades?${query.toString()}`)

		return response.data
	}
}
