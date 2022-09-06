import { useContext } from 'react'

import TradeAssetImage from 'assets/images/TradeAsset'
import { Button, MyNFTsModal } from 'components'
import { ModalContext } from 'context'

import { iStep } from 'hooks/react/useStep'
import { useTranslation } from 'next-i18next'
import { useFormContext } from 'react-hook-form'
import { NFT } from 'services/api/walletNFTsService'
import { Box, Text } from 'theme-ui'
import { TradeFormStepsProps } from './formProps'
import {
	ContentCard,
	ContentCardSubtitle,
	ContentCardTitle,
	TradeAssetImageContainer,
} from './TradeFormStep1.styled'

interface Props {
	goNextStep: () => void
	step: iStep
}

export const TradeFormStep1 = ({ goNextStep, step }: Props) => {
	const { t } = useTranslation(['common', 'trade'])
	const { handleModal } = useContext(ModalContext)

	const { setValue, getValues } = useFormContext<TradeFormStepsProps>()

	const onAddNFTs = (NFTs: NFT[]) => {
		if (step.current === 0) {
			goNextStep()
		}
		setValue('selectedNFts', NFTs)
		handleModal?.(null)
	}
	return (
		<ContentCard>
			<TradeAssetImageContainer>
				<TradeAssetImage />
			</TradeAssetImageContainer>

			<Box sx={{ mb: ['2px'] }}>
				<ContentCardTitle>{t('trade:question')}</ContentCardTitle>
			</Box>
			<Box sx={{ mb: ['16px'] }}>
				<ContentCardSubtitle>{t('trade:add-instruction')}</ContentCardSubtitle>
			</Box>

			<Button
				sx={{ minWidth: ['140px'] }}
				onClick={e => {
					e.preventDefault()
					handleModal?.(
						<MyNFTsModal
							selectedNFTs={getValues('selectedNFts')}
							onAddNFTs={onAddNFTs}
						/>,
						true
					)
				}}
				fullWidth
				variant='gradient'
			>
				<Text variant='textSmMedium'>{t('trade:select-nfts')}</Text>
			</Button>
		</ContentCard>
	)
}
