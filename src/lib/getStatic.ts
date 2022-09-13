import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import * as i18nextConfig from '../../next-i18next.config'

export const getI18nPaths = params =>
	i18nextConfig.i18n.locales.map(lng => ({
		params: {
			...params,
			locale: lng,
		},
	}))

export function makeStaticPaths(params = {}) {
	return async function getStaticPaths() {
		return {
			fallback: false,
			paths: getI18nPaths(params),
		}
	}
}

export async function getI18nProps(ctx, ns = ['common']) {
	const locale = ctx?.params?.locale
	return {
		...(await serverSideTranslations(locale, ns)),
	}
}

export function makeStaticProps(ns: undefined | string[] = undefined) {
	return async function getStaticProps(ctx) {
		return {
			props: await getI18nProps(ctx, ns),
		}
	}
}
