import { useTranslation } from 'next-i18next'
import { NavigationFooter } from './NavigationFooter'
import {
	ContentCard,
	ContentCardSubtitle,
	ContentCardTitle,
	ContentCardWrapper,
} from './ConfirmListing.styled'

interface Props {
	goBackStep: () => void
}

export const ConfirmListing = ({ goBackStep }: Props) => {
	const { t } = useTranslation(['common', 'trade'])

	return (
		<ContentCardWrapper>
			<ContentCard>
				<ContentCardTitle>{t('todo')}</ContentCardTitle>
				<ContentCardSubtitle>{t('todo')}</ContentCardSubtitle>
				<div>TODO</div>
			</ContentCard>

			{/* Footer Navigation Section */}
			<NavigationFooter
				goBackStep={goBackStep}
				goNextStep={() => console.log('call terra station')}
				isNextButtonDisabled={false}
			/>
		</ContentCardWrapper>
	)
}
