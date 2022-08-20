import React from 'react'
import styled from '@emotion/styled'
import { Box, Flex } from 'theme-ui'

const StepBox = styled(Box)<{ checked?: boolean }>`
	flex: 1;
	background: ${props =>
		props.checked ? props.theme.colors.primary100 : props.theme.colors.dark200};
	border-radius: 8px;

	margin-right: 10px;

	height: 12px;

	&:last-child {
		margin-right: 0px;
	}
`

type Step = {
	id: number
	checked: boolean
}
export interface MobileStepsProps {
	steps: Step[]
}

function ProgressTabs({ steps }: MobileStepsProps) {
	return (
		<Flex>
			{steps.map(({ id, checked }) => (
				<StepBox key={id} checked={checked} />
			))}
		</Flex>
	)
}

export default ProgressTabs
