import React from 'react'
import * as ROUTES from 'constants/routes'

import { useTranslation } from 'next-i18next'
import { LinkButton } from 'components/link'

export default function ExitCreateTradeListing() {
	const { t } = useTranslation(['common'])
	return (
		<LinkButton variant='secondary' size='medium' href={ROUTES.TRADE_LISTINGS}>
			{t('common:exit-create-listing')}
		</LinkButton>
	)
}
