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
			'terra1d3xtfkumcxl6225mhfvgwjt0sql30x5yc0hrap2qdfwfs762aj5sa2we47',
		'fee-collector':
			'terra1f0u8h08a8eyvyg770tkcln6l78080kafrmnlw0f5qd89qcydqv6s0y0wcc',
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
