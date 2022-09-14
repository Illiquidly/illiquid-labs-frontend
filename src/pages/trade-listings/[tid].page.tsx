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

/** todo: fix this */

export async function getStaticPaths() {
	return {
		paths: [{ params: { tid: '1' } }],
		fallback: false, // can also be true or 'blocking'
	}
}

export default Redirect
