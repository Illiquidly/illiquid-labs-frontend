import { ContractName, NetworkId } from 'types'

export enum CONTRACT_NAME {
	loan = 'loan',
	raffle = 'raffle',
	p2pTrade = 'p2pTrade',
	feeCollector = 'feeCollector',
	nameService = 'nameService',
}

export const contractAddresses: {
	[k in NetworkId]: { [key in ContractName]: string }
} = {
	'phoenix-1': {
		loan: '',
		raffle: 'terra1655tux08qla5rsl7w55xwx9nu4km9wuguy90ghqjxmcuh0c3zksq6jae9v',
		p2pTrade: 'terra1vvwcxnrhzvwjw7c0t7ks3pe0fvj82rcyrmpsejj22csg0rawpc9qs9fyv4',
		feeCollector:
			'terra14j02llvrly27dzw9zqumfql9uw5ea3kl0f0wujp42p8uq7g8w67srcyfdw',
		nameService:
			'terra16a6qkmxpqzeyez8gh3w7qhrk7x3xe3arlv9nwfg944y8vzg9smrqntark3',
	},
	'pisco-1': {
		loan: 'terra196f7nl00a0kfa6ph3ycc5ws6q2lm73r3uv8ra92huptnd2a8v4kqv9tea2',
		raffle: 'terra1vmrf7z6yr34rgpkkv2yk0t28hdlfzwunql9ldusum9cc8ef272ksy6kjgz',
		p2pTrade: 'terra1405pwjpdl629uemdqaf57gf765ufv7y3e2xszch4y8zhhwczapwsse2eh0',
		feeCollector:
			'terra1uh0vx5eh5tu49g5hw98r622m805vg533j3kjf8c2mtqhz6qfyyxqms5tmw',
		nameService:
			'terra1zl866qkqmwygzcr8xwqa70mep0raqt40ddqhu9ur3yguekg7g3xq6ctmw4',
	},
}
