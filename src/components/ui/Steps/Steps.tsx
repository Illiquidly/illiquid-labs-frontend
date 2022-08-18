import React from 'react'
import styled from '@emotion/styled'
import { Flex, Text } from 'theme-ui'
import { CheckLineIcon } from 'assets/icons/24pt'

const StepsContainer = styled(Flex)`
	flex: 1;
	flex-direction: column;
	overflow: hidden;
	border-radius: 8px;

	border: ${props => props.theme.colors.dark500} solid 1px;
`

export const Circle = styled(Flex)`
	align-items: center;
	justify-content: center;

	background-color: ${props => props.theme.colors.dark100};
	border-radius: 100%;
	padding: 4px;

	width: 32px;
	height: 32px;
`

const Card = styled(Flex)`
	display: flex;
	align-items: center;
	background: ${props => props.theme.colors.secondary500};
	padding: 16px 12px;

	margin-bottom: 2px;
	&:last-child {
		margin-bottom: 0px;
	}
`

type Step = {
	id: number
	label: string
	highlighted: boolean
	checked: boolean
}
export interface ProgressCardProps {
	steps: Step[]
}

export default function Steps({ steps }: ProgressCardProps) {
	return (
		<StepsContainer>
			{steps.map(({ id, label, highlighted, checked }) => (
				<Card key={id}>
					<Flex sx={{ alignItems: 'center', mr: ['12px'] }}>
						<Circle>{checked && <CheckLineIcon fill='#fff' />}</Circle>
					</Flex>
					<Text
						color={highlighted ? 'gray1000' : 'secondary200'}
						variant='textMdSemibold'
					>
						{label}
					</Text>
				</Card>
			))}
		</StepsContainer>
	)
}
