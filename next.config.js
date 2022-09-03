/**
 * @type {import('next').NextConfig}
 */

const nextConfig = {
	trailingSlash: true,
	pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js'],
	webpack(config) {
		config.module.rules.push({
			test: /\.svg$/,
			use: ['@svgr/webpack'],
		})

		const updatedConfig = config
		updatedConfig.resolve.fallback = { fs: false }

		return updatedConfig
	},
}

module.exports = nextConfig
