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
		<Flex
			sx={{
				flex: 1,
				flexDirection: 'column',
				justifyContent: 'center',
				height: '90vh',
			}}
		>
			<Flex
				sx={{
					alignItems: 'center',
					justifyContent: 'center',
					flexDirection: 'column',
				}}
			>
				<Flex
					sx={{
						minWidth: ['unset', '601.2px'],
						minHeight: ['unset', '421.2px'],
					}}
				>
					<NotFoundImg />
				</Flex>
				<NotFoundText>{t('common:page-not-found-text')}</NotFoundText>
			</Flex>
		</Flex>
	)
}
