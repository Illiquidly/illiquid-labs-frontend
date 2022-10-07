import { useTheme } from '@emotion/react'
import { WalletIcon } from 'assets/icons/mixed'
import TradeAssetImage from 'assets/images/TradeAsset'
import { Button, Card, TextArea } from 'components/ui'
import useAddress from 'hooks/useAddress'
import { useTranslation } from 'next-i18next'
import React from 'react'
import { Box } from 'theme-ui'
import NiceModal from '@ebay/nice-modal-react'
import { asyncAction } from 'utils/js/asyncAction'
import { MyNFTsModal } from 'components/shared'
import { NFT } from 'services/api/walletNFTsService'
import { useFormContext } from 'react-hook-form'
import {
	AttributeCard,
	AttributeName,
	AttributeValue,
	Label,
	SelectNFTsSection,
	Subtitle,
	Title,
} from './styled'

export default function SelectNFTs() {
	const theme = useTheme()
	const { t } = useTranslation(['common', 'trade-listings'])
	const myAddress = useAddress()
	const {
		setValue,
		getValues,
		register,
		formState: { isValid },
	} = useFormContext()

	const handleSelectMyNFTs = async () => {
		const [, NFTs] = await asyncAction<NFT[]>(
			NiceModal.show(MyNFTsModal, {
				selectedNFTs: getValues('selectedNFTs'),
			})
		)

		if (NFTs) {
			setValue('selectedNFTs', NFTs)
		}
	}

	return (
		<Card sx={{ flexDirection: 'column', p: '12px', gap: '16px' }}>
			<AttributeCard>
				<AttributeName>
					{t('trade-listings:trade-counter.you-offer-as')}
				</AttributeName>
				<AttributeValue>
					<WalletIcon width='20px' height='20px' color={theme.colors.gray1000} />
					<Box
						sx={{
							ml: '9px',
							flex: 1,
						}}
					>
						{myAddress ?? ''}
					</Box>
				</AttributeValue>
			</AttributeCard>
			<SelectNFTsSection>
				<TradeAssetImage height='99.84px' width='91.59px' />
				<Title>{t('trade-listings:trade-counter.select-at-least-one-item')}</Title>
				<Box sx={{ mt: 2 }}>
					<Subtitle>
						{t(
							'trade-listings:trade-counter.explain-what-sets-you-and-your-nfts-apart'
						)}
					</Subtitle>
				</Box>

				<Box sx={{ mt: 10 }}>
					<Button
						onClick={handleSelectMyNFTs}
						sx={{ minWidth: ['140px'] }}
						variant='gradient'
					>
						{t('trade-listings:trade-counter.pick-nfts')}
					</Button>
				</Box>
			</SelectNFTsSection>
			<Button variant='dark'>
				{t('trade-listings:trade-counter.add-a-token-on-top')}
			</Button>

			<Label>{t('trade-listings:trade-counter.write-a-comment')}</Label>
			<TextArea
				id='comment'
				style={{ height: '128px' }}
				{...register('comment')}
				placeholder={t('trade-listings:trade-counter.enter-text')}
			/>

			<Button
				disabled={isValid}
				type='submit'
				variant='gradient'
				size='extraLarge'
			>
				{t('trade-listings:trade-counter.review-offer')}
			</Button>
		</Card>
	)
}
