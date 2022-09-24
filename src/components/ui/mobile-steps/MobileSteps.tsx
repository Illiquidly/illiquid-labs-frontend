import { useTheme } from '@emotion/react'

import { CheckLineIcon } from 'assets/icons/24pt'
import React from 'react'
import { Flex, Text } from 'theme-ui'
import Card from '../card/Card'
import { Circle, StepBox } from './MobileSteps.styled'

type Step = {
	id: number
	label: string
}
export interface MobileStepsProps {
	steps: Step[]
	currentStep: number
}

function MobileSteps({ steps, currentStep }: MobileStepsProps) {
	const stepLabel = React.useMemo(
		() => [...steps].find(x => x.id === currentStep)?.label,
		[steps, currentStep]
	)

	const theme = useTheme()

	return (
		<Flex sx={{ flexDirection: 'column' }}>
			<Flex sx={{ mb: '13px' }}>
				{steps.map(({ id }) => (
					<StepBox key={id} checked={currentStep >= id} />
				))}
			</Flex>
			<Card sx={{ p: ['16px 12px'] }}>
				<Flex sx={{ alignItems: 'center' }}>
					<Flex sx={{ alignItems: 'center', mr: ['12px'] }}>
						<Circle>
							<CheckLineIcon fill={theme.colors.natural50} />
						</Circle>
					</Flex>
					<Text color='gray1000' variant='textMdSemibold'>
						{stepLabel}
					</Text>
				</Flex>
			</Card>
		</Flex>
	)
}

export default MobileSteps
