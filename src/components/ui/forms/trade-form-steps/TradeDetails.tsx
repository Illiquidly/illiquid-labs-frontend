import TradeDetailsOpenToOffers from 'assets/images/TradeDetailsOpenToOffers'
import TradeDetailsSpecifiedCollection from 'assets/images/TradeDetailsSpecifiedCollection'
import { Button } from 'components'
import { useTranslation } from 'next-i18next'
import { useFormContext } from 'react-hook-form'
import { Flex } from 'theme-ui'
import { COLLECTION_TYPE, TradeFormStepsProps } from './formProps'
import {
	CardItem,
	CardItemInput,
	CardItemText,
	ContentCard,
	ContentCardSubtitle,
	ContentCardTitle,
	ContentCardWrapper,
} from './TradeDetails.styled'

const TradeDetailsCollectionSelector = () => {
	const { t } = useTranslation(['common', 'trade'])

	const { register } = useFormContext<TradeFormStepsProps>()
	return (
		<>
			<ContentCardTitle>{t('trade:tradeDetails.question')}</ContentCardTitle>
			<ContentCardSubtitle>
				{t('trade:tradeDetails.instructions')}
			</ContentCardSubtitle>

			<Flex sx={{ gap: '8px' }}>
				<CardItem>
					<CardItemInput
						type='radio'
						{...register('collectionType')}
						value={COLLECTION_TYPE.SPECIFIC}
					/>
					<TradeDetailsSpecifiedCollection />
					<CardItemText>{t('trade:tradeDetails.option-1')}</CardItemText>
				</CardItem>

				<CardItem>
					<CardItemInput
						type='radio'
						{...register('collectionType')}
						value={COLLECTION_TYPE.ANY}
					/>
					<TradeDetailsOpenToOffers />
					<CardItemText>{t('trade:tradeDetails.option-2')}</CardItemText>
				</CardItem>
			</Flex>
		</>
	)
}

interface Props {
	goNextStep: () => void
	goBackStep: () => void
}

export const TradeDetails = ({ goNextStep, goBackStep }: Props) => {
	const { t } = useTranslation(['common', 'trade'])
	const { getValues } = useFormContext<TradeFormStepsProps>()

	return (
		<ContentCardWrapper>
			<ContentCard>
				{!getValues('collectionType') && <TradeDetailsCollectionSelector />}
				<div>second step</div>
			</ContentCard>
			{/* Footer Navigation Section */}
			<Flex sx={{ justifyContent: 'space-between', paddingTop: '12px' }}>
				<Button onClick={() => goBackStep()} variant='secondary'>
					{t('common:buttons.previous-step')}
				</Button>
				<Button
					variant='gradient'
					onClick={() => goNextStep()}
					disabled={!getValues('collectionType')}
				>
					{t('common:buttons.save-and-continue')}
				</Button>
			</Flex>
		</ContentCardWrapper>
	)
}
