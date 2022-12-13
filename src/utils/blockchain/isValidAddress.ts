import { bech32 } from 'bech32'

// TODO: this should be more generic in future not only Terra.
export function isValidTerraAddress(address: string) {
	try {
		const { prefix: decodedPrefix } = bech32.decode(address) // throw error if checksum is invalid
		// verify address prefix
		return decodedPrefix === 'terra'
	} catch {
		// invalid checksum
		return false
	}
}
