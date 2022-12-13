// We take multiple urls for fallback
const fallbackIPFSUrls = [
	'https://d1mx8bduarpf8s.cloudfront.net/', // This was actually from Luart CDN.
	'https://ipfs.fleek.co/ipfs/', // Standard IPFS here...
	'https://ipfs.io/ipfs/',
	'https://cloudflare-ipfs.com/ipfs/',
]

export function fromIPFSImageURLtoImageURL(originUrl?: string): string[] {
	return fallbackIPFSUrls.map(ipfsUrl =>
		encodeURI((originUrl || '').replace('ipfs://', ipfsUrl))
	)
}
