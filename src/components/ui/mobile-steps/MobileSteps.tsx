import React from 'react'
import styled from '@emotion/styled'
import { Box, Flex, Text } from 'theme-ui'
import { CheckLineIcon } from 'assets/icons/24pt'
import { useTheme } from '@emotion/react'
import Card from '../card/Card'

const StepBox = styled(Box)<{ checked?: boolean }>`
	flex: 1;
	user-select: none;
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
	label: string
	highlighted: boolean
}
export interface MobileStepsProps {
	steps: Step[]
}

export const Circle = styled(Flex)`
	align-items: center;
	justify-content: center;

	background-color: ${props => props.theme.colors.dark100};
	border-radius: 100%;
	padding: 4px;

	width: 32px;
	height: 32px;
`

function MobileSteps({ steps }: MobileStepsProps) {
	const stepLabel = React.useMemo(
		() => [...steps].reverse().find(x => x.checked)?.label || steps[0]?.label,
		[steps]
	)

	const theme = useTheme()

	return (
		<Flex sx={{ flexDirection: 'column' }}>
			<Flex sx={{ mb: '13px' }}>
				{steps.map(({ id, highlighted }) => (
					<StepBox key={id} checked={highlighted} />
				))}
			</Flex>
			<Card sx={{ p: ['16px 12px'] }}>
				<Flex sx={{ alignItems: 'center' }}>
					<Flex sx={{ alignItems: 'center', mr: ['12px'] }}>
						<Circle>
							<CheckLineIcon fill={theme.colors.gray1000} />
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
