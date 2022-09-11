import { Button } from 'components'
import { useTranslation } from 'next-i18next'
import { Flex } from 'theme-ui'

interface Props {
	goBackStep: () => void
	goNextStep: () => void
	isNextButtonDisabled: boolean
}

export const NavigationFooter = ({
	goBackStep,
	goNextStep,
	isNextButtonDisabled,
}: Props) => {
	const { t } = useTranslation('common')

	return (
		<Flex sx={{ justifyContent: 'space-between', paddingTop: '12px' }}>
			<Button onClick={() => goBackStep()} variant='secondary'>
				{t('common:buttons.previous-step')}
			</Button>
			<Button
				variant='gradient'
				onClick={() => goNextStep()}
				disabled={isNextButtonDisabled}
			>
				{t('common:buttons.save-and-continue')}
			</Button>
		</Flex>
	)
}
