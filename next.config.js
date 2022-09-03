/* eslint-disable no-param-reassign */
module.exports = {
	trailingSlash: true,
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

		config.resolve.fallback = {
			...config.resolve.fallback,
			fs: false,
		}

		return config
	},
}
