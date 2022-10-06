import { Button } from 'components/ui'
import React from 'react'
import * as ROUTES from 'constants/routes'

import { useTranslation } from 'next-i18next'

export default function ExitCreateTradeListing() {
	const { t } = useTranslation(['common'])
	return (
		<Button variant='secondary' size='medium' href={ROUTES.TRADE_LISTINGS}>
			{t('common:exit-create-listing')}
		</Button>
	)
}
