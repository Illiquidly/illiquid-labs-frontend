import { getNetworkId } from 'utils/blockchain/terraUtils'

export type ContractName = 'p2p-trade' | 'fee-collector' | 'raffle'

const addresses: { [k: string]: { [key: string]: string } } = {
	'columbus-5': {
		raffle: '',
		'p2p-trade': '',
		'fee-collector': '',
	},
	'phoenix-1': {
		raffle: '',
		'p2p-trade':
			'terra1vvwcxnrhzvwjw7c0t7ks3pe0fvj82rcyrmpsejj22csg0rawpc9qs9fyv4',
		'fee-collector':
			'terra14j02llvrly27dzw9zqumfql9uw5ea3kl0f0wujp42p8uq7g8w67srcyfdw',
	},
	'pisco-1': {
		raffle: 'terra1vmrf7z6yr34rgpkkv2yk0t28hdlfzwunql9ldusum9cc8ef272ksy6kjgz',
		'p2p-trade':
			'terra1405pwjpdl629uemdqaf57gf765ufv7y3e2xszch4y8zhhwczapwsse2eh0',
		'fee-collector':
			'terra1uh0vx5eh5tu49g5hw98r622m805vg533j3kjf8c2mtqhz6qfyyxqms5tmw',
	},
}

function getContractAddress(contractName: ContractName): string {
	const networkId = getNetworkId()
	return addresses[networkId][contractName]
}

export default {
	getContractAddress,
}
