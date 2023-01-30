import { Flex } from 'theme-ui'
import { useTranslation } from 'next-i18next'

import { Button } from 'components/ui'

interface Props {
	goBackStep: () => void
	goNextStep: () => void
	isNextButtonDisabled?: boolean
	isBackButtonDisabled?: boolean
	canGoToNextStep?: boolean
}

const NavigationFooter = ({
	goBackStep,
	goNextStep,
	isNextButtonDisabled,
	isBackButtonDisabled,
	canGoToNextStep,
}: Props) => {
	const { t } = useTranslation('common')

	return (
		<Flex sx={{ justifyContent: 'space-between', py: '12px' }}>
			<Button
				onClick={() => goBackStep()}
				variant='secondary'
				disabled={isBackButtonDisabled}
			>
				{t('common:buttons.previous-step')}
			</Button>
			<Button
				type={canGoToNextStep ? 'button' : 'submit'}
				variant='gradient'
				onClick={() => goNextStep()}
				disabled={isNextButtonDisabled}
			>
				{t('common:buttons.save-and-continue')}
			</Button>
		</Flex>
	)
}

NavigationFooter.defaultProps = {
	isBackButtonDisabled: false,
	isNextButtonDisabled: false,
	canGoToNextStep: true,
}

export default NavigationFooter
