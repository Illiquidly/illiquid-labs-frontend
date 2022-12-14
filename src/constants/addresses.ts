import { ContractName, NetworkId } from 'types'

export enum CONTRACT_NAME {
	raffle = 'raffle',
	p2pTrade = 'p2pTrade',
	feeCollector = 'feeCollector',
	nameService = 'nameService',
}

export const contractAddresses: {
	[k in NetworkId]: { [key in ContractName]: string }
} = {
	'phoenix-1': {
		raffle: '',
		p2pTrade: 'terra1vvwcxnrhzvwjw7c0t7ks3pe0fvj82rcyrmpsejj22csg0rawpc9qs9fyv4',
		feeCollector:
			'terra14j02llvrly27dzw9zqumfql9uw5ea3kl0f0wujp42p8uq7g8w67srcyfdw',
		nameService:
			'terra16a6qkmxpqzeyez8gh3w7qhrk7x3xe3arlv9nwfg944y8vzg9smrqntark3',
	},
	'pisco-1': {
		raffle: 'terra1vmrf7z6yr34rgpkkv2yk0t28hdlfzwunql9ldusum9cc8ef272ksy6kjgz',
		p2pTrade: 'terra1405pwjpdl629uemdqaf57gf765ufv7y3e2xszch4y8zhhwczapwsse2eh0',
		feeCollector:
			'terra1uh0vx5eh5tu49g5hw98r622m805vg533j3kjf8c2mtqhz6qfyyxqms5tmw',
		nameService:
			'terra1zl866qkqmwygzcr8xwqa70mep0raqt40ddqhu9ur3yguekg7g3xq6ctmw4',
	},
}
