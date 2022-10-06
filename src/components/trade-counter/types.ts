import { NFT } from 'services/api/walletNFTsService'

export interface TradeCounterForm {
	comment: string
	selectedNFTs: NFT[]
	tokenAmount: string
	tokenName: string
}
