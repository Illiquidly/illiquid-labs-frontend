import { useState } from 'react'

export interface StepProps {
	current: number
	max: number
}

export function useStep({ max }: { max: number }) {
	const [step, setStep] = useState<StepProps>({
		current: 0,
		max,
	})

	const goNextStep = () => {
		setStep(prevStep =>
			prevStep.current >= prevStep.max
				? prevStep
				: { ...prevStep, current: prevStep.current + 1 }
		)
	}

	const goBackStep = () => {
		setStep(prevStep =>
			prevStep.current < 1
				? prevStep
				: { ...prevStep, current: prevStep.current - 1 }
		)
	}

	const deactivateStepper = () => {
		setStep(prevStep => {
			return { ...prevStep, isActive: false }
		})
	}

	return { step, setStep, goNextStep, goBackStep, deactivateStepper }
}
