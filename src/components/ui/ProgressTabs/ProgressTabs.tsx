import React from 'react'
import styled from 'styled-components'
import { Box, Flex } from 'reflexbox/styled-components'

export interface ProgressTabsProps {
	currentStep?: number
	steps?: number
}

const ProgressTab = styled(Box)<{ checked?: boolean }>`
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

function ProgressTabs({ currentStep = 1, steps = 4 }: ProgressTabsProps) {
	return (
		<Flex>
			{Array.from({ length: steps }).map((_, i) => (
				// eslint-disable-next-line react/no-array-index-key
				<ProgressTab key={`step_${i}`} checked={currentStep >= i + 1} />
			))}
		</Flex>
	)
}

export default ProgressTabs
