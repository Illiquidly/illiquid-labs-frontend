import { CheckLineIcon } from 'assets/icons/24pt'
import { Flex, Text } from 'theme-ui'
import { Card, Circle, StepsContainer } from './Steps.styled'

type Step = {
	id: number
	label: string
}
interface StepsProps {
	steps: Step[]
	currentStep: number
}

export default function Steps({ steps, currentStep }: StepsProps) {
	return (
		<StepsContainer>
			{steps.map(({ id, label }) => (
				<Card key={id}>
					<Flex sx={{ alignItems: 'center', mr: ['12px'] }}>
						<Circle isHighlighted={currentStep >= id}>
							{currentStep >= id && <CheckLineIcon />}
						</Circle>
					</Flex>
					<Text
						color={currentStep >= id ? 'gray1000' : 'secondary200'}
						variant='textMdSemibold'
					>
						{label}
					</Text>
				</Card>
			))}
		</StepsContainer>
	)
}
