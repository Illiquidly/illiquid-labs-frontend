export type CounterOffer = {
	user: {
		username: string
		wallet: string
	}
	nfts: [
		{
			collectionAddress: string
			collectionName: string
			attributes: []
			imageUrl: string
			tokenId: string
			description: string
		}
	]
	// tokens,
	date: string
	approved: boolean | undefined
}
