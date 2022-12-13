export interface TxReceipt {
	txId: string
	txTerraFinderUrl: string // TODO: change this for IBC, to more generic name.
	txFee: string
}
