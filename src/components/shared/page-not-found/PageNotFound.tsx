import React from 'react'
import { Flex } from 'theme-ui'
import { useTranslation } from 'next-i18next'
import NotFoundImg from 'assets/images/NotFoundImg'
import styled from '@emotion/styled'

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

export default function PageNotFound() {
	const { t } = useTranslation()

	return (
		<Flex sx={{ flex: 1, flexDirection: 'column' }}>
			<Flex sx={{ justifyContent: 'center', marginTop: '48px' }}>
				<NotFoundImg />
			</Flex>
			<Flex
				sx={{
					paddingBottom: '96px',
					paddingTop: '48px',
					alignItems: 'center',
					justifyContent: 'center',
					flexDirection: 'column',
				}}
			>
				<NotFoundText>{t('common:oops')}</NotFoundText>
				<NotFoundText>{t('common:page-not-found-text')}</NotFoundText>
			</Flex>
		</Flex>
	)
}
