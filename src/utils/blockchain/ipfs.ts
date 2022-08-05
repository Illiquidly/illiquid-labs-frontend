const fallbackIPFSUrls = [
	'https://d1mx8bduarpf8s.cloudfront.net/',
	'https://ipfs.fleek.co/ipfs/',
	'https://ipfs.io/ipfs/',
	'https://cloudflare-ipfs.com/ipfs/',
]

export function fromIPFSImageURLtoImageURL(originUrl?: string): string[] {
	return fallbackIPFSUrls.map(ipfsUrl =>
		encodeURI((originUrl || '').replace('ipfs://', ipfsUrl))
	)
}
