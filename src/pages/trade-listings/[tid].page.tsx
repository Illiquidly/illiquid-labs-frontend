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
		paths: [{ params: { tid: Number(0).toString() } }],
		fallback: true,
	}
}

export default Redirect
