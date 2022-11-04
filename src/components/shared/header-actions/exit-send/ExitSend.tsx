import React from 'react'
import * as ROUTES from 'constants/routes'

import { useTranslation } from 'next-i18next'
import { LinkButton } from 'components/link'

export default function ExitSend() {
	const { t } = useTranslation(['common'])
	return (
		<LinkButton
			sx={{
				padding: ['10px 10px', '10px 16px'],
				fontSize: ['12px', '14px'],
				textOverflow: 'ellipsis',
				overflow: 'hidden',
				whiteSpace: 'nowrap',
			}}
			variant='secondary'
			size='medium'
			href={ROUTES.SEND_TRANSACTIONS}
		>
			{t('common:exit-send')}
		</LinkButton>
	)
}
