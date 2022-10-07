import { ArrowLeftIcon } from 'assets/icons/mixed'
import { Flex } from 'theme-ui'
import * as ROUTES from 'constants/routes'
import { useTranslation } from 'next-i18next'

import NotFoundImg from 'assets/images/NotFoundImg'
import React from 'react'
import styled from '@emotion/styled'
import { LinkButton } from 'components/link'

const NotFoundText = styled(Flex)`
	font-family: 'Inter';
	font-style: normal;
	font-weight: 700;
	text-align: center;
`

NotFoundText.defaultProps = {
	sx: {
		fontSize: ['30px', '50px', '50px'],
		lineHeight: ['36px', '66px', '66px'],
	},
}

export const NoLongerExist = () => {
	const { t } = useTranslation(['common', 'trade-listings'])

	return (
		<>
			<Flex
				sx={{
					justifyContent: 'flex-start',
					padding: '22px 0',
				}}
			>
				<LinkButton
					href={ROUTES.TRADE_LISTINGS}
					sx={{ height: '40px', padding: '13px' }}
					variant='secondary'
					startIcon={<ArrowLeftIcon />}
				>
					{t('trade-listings:back-to-listings')}
				</LinkButton>
			</Flex>
			<Flex sx={{ justifyContent: 'center', marginTop: '48px' }}>
				<NotFoundImg />
			</Flex>
			<Flex
				sx={{
					paddingBottom: '96px',
					paddingTop: '22px',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<NotFoundText>
					{t('trade-listings:not-found-text')}
					<br />
					{t('trade-listings:no-longer-exists')}
				</NotFoundText>
			</Flex>
		</>
	)
}

export default NoLongerExist
