import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Redirect } from 'lib'

export async function getStaticProps({ locale = 'en' }) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common'])),
			// Will be passed to the page component as props
		},
	}
}

export async function getStaticPaths() {
	return {
		// NOTE: This is hacky solution. TODO: We need to switch to server rendering.
		paths: Array.from({ length: 100000 }).map((_, index) => ({
			params: { tid: `${index}` },
		})),
		fallback: true,
	}
}

export default Redirect
