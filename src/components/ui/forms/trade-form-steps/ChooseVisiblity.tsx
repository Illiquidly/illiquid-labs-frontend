import { useTranslation } from 'next-i18next'
import { useFormContext } from 'react-hook-form'
import { ContentCardWrapper } from './ChooseVisibility.styled'
import { TradeFormStepsProps } from './formProps'

interface Props {
	goNextStep: () => void
	goBackStep: () => void
}

export const ChooseVisibility = ({ goNextStep, goBackStep }: Props) => {
	const { t } = useTranslation(['common', 'trade'])
	const { getValues } = useFormContext<TradeFormStepsProps>()

	return <ContentCardWrapper>Placeholder</ContentCardWrapper>
}
