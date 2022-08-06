module.exports = {
	images: {
		loader: 'akamai',
		path: '',
	},
	pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js'],
	webpack(config) {
		config.module.rules.push({
			test: /\.svg$/,
			use: ['@svgr/webpack'],
		})

		return config
	},
}
