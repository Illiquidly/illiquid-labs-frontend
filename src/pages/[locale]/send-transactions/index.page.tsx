import AirdropperImg from 'assets/images/AirdropperImg'
import MultisenderImg from 'assets/images/MultisenderImg'
import { LayoutContainer, LinkButton, Page } from 'components'
import {
	CardSubtitle,
	SendingCard,
	SendTransactionsTable,
	Title,
} from 'components/send-transactions'
import { makeStaticPaths, makeStaticProps } from 'lib'
import { useTranslation } from 'next-i18next'
import React from 'react'
import { Box, Flex } from 'theme-ui'
import * as ROUTES from 'constants/routes'
import { SEND_TYPE } from 'constants/sendTypes'

const getStaticProps = makeStaticProps(['common', 'send-transactions'])
const getStaticPaths = makeStaticPaths()
export { getStaticPaths, getStaticProps }

export default function SendTransactions() {
	const { t } = useTranslation(['common', 'send-transactions'])

	return (
		<Page title={t('common:title')}>
			<LayoutContainer>
				<Box sx={{ mt: ['14px', '32px'] }}>
					<Title>{t('send-transactions:start-sending')}</Title>
				</Box>
				<Flex
					sx={{
						flexDirection: ['column', 'column', 'row'],
						mt: ['8px'],
						gap: ['16px', '24px'],
					}}
				>
					<SendingCard>
						<MultisenderImg width={263} height={182} />
						<Box sx={{ mt: '8px' }}>
							<Title>{t('send-transactions:nft-multisender')}</Title>
						</Box>
						<Box sx={{ mt: '8px' }}>
							<CardSubtitle>
								{t('send-transactions:nft-multisender-description')}
							</CardSubtitle>
						</Box>
						<Flex sx={{ mt: '16px', width: '128px' }}>
							<LinkButton
								href={`${ROUTES.SEND}?type=${SEND_TYPE.MULTI_SEND_TYPE}`}
								fullWidth
								variant='gradient'
							>
								{t('send-transactions:multisend')}
							</LinkButton>
						</Flex>
					</SendingCard>
					<SendingCard>
						<AirdropperImg width={263} height={182} />
						<Box sx={{ mt: '8px' }}>
							<Title>{t('send-transactions:nft-airdropper')}</Title>
						</Box>
						<Box sx={{ mt: '8px' }}>
							<CardSubtitle>
								{t('send-transactions:nft-airdropper-description')}
							</CardSubtitle>
						</Box>

						<Flex sx={{ mt: '16px', width: '128px' }}>
							<LinkButton
								href={`${ROUTES.SEND}?type=${SEND_TYPE.AIRDROP_TYPE}`}
								fullWidth
								variant='gradient'
							>
								{t('send-transactions:airdrop')}
							</LinkButton>
						</Flex>
					</SendingCard>
				</Flex>
				<Flex sx={{ mt: ['32px'], flexDirection: 'column', gap: '12px' }}>
					<Title>{t('send-transactions:previous-transactions')}</Title>
					<SendTransactionsTable />
				</Flex>
			</LayoutContainer>
		</Page>
	)
}
