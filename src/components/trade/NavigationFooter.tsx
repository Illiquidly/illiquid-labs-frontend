import { Button } from 'components'
import { useTranslation } from 'next-i18next'
import { Flex } from 'theme-ui'

interface Props {
	goBackStep: () => void
	goNextStep: () => void
	isNextButtonDisabled?: boolean
	isBackButtonDisabled?: boolean
	canGoToNextStep?: boolean
}

export const NavigationFooter = ({
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
