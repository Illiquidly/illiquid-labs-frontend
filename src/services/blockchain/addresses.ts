import { getNetworkId } from 'utils/blockchain/terraUtils'

export type ContractName = 'p2p-trade' | 'Illiqudity' | 'fee-collector'

const cw20Addresses: { [k: string]: { [key in ContractName]?: string } } = {
	'columbus-5': {
		Illiqudity: '',
	},
	'phoenix-1': {
		Illiqudity: '',
	},
	'pisco-1': {
		Illiqudity: '',
	},
}

const addresses: { [k: string]: { [key: string]: string } } = {
	'columbus-5': {
		'p2p-trade': '',
		'fee-collector': '',
		...cw20Addresses['columbus-5'],
	},
	'phoenix-1': {
		'p2p-trade': '',
		'fee-collector': '',
		...cw20Addresses['phoenix-1'],
	},
	'pisco-1': {
		'p2p-trade':
			'terra1sft6nydyn487w6seslg5vruz95gyeqlwvqeux20rs9l7fk4qq8lq2f94x0',
		'fee-collector':
			'terra1xavp8ha2hj07704wz9c3t5v9cx2d7urmvz3gvrtftyyygdjl4arq3zavuy',
		...cw20Addresses['pisco-1'],
	},
}

function getContractAddress(contractName: ContractName): string {
	const networkId = getNetworkId()
	return addresses[networkId][contractName]
}

export default {
	getContractAddress,
}
