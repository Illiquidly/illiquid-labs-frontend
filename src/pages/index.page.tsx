import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Redirect } from 'lib'
import * as ROUTES from 'constants/routes'

export async function getStaticProps({ locale = 'en' }) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common'])),
			// Will be passed to the page component as props
		},
	}
}

export default () => <Redirect to={ROUTES.TRADE_LISTINGS} />
