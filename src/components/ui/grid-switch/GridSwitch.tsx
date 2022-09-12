import { withForwardRef } from 'hoc'
import { uniqueId } from 'lodash'
import React from 'react'
import { Box, Flex } from 'theme-ui'

import {
	Container,
	Input,
	Knob,
	Background,
	BigGrid,
	SmallGrid,
	GridContainer,
} from './GridSwitch.styled'

interface GridSwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
	forwardedRef?: React.RefObject<HTMLInputElement>
}

const GridSwitch = (props: GridSwitchProps) => {
	const { checked, disabled, forwardedRef } = props
	const inputRef = React.useRef<HTMLInputElement>(null)

	const handleClick = () => inputRef?.current?.click()

	React.useImperativeHandle(
		forwardedRef,
		() => inputRef.current as HTMLInputElement
	)

	const renderBoxes = React.useCallback(
		(count: number, isChecked) =>
			Array.from({ length: count }).map(() => (
				<Box
					key={uniqueId('boxes')}
					sx={{
						flex: 1,
						bg: isChecked ? '#fff' : 'dark100',
						borderRadius: '1.58px',
						width: '100%',
						height: '100%',
					}}
				/>
			)),
		[]
	)

	return (
		<Container disabled={disabled} onClick={handleClick}>
			<Input {...props} type='checkbox' ref={inputRef} />
			<Background>
				<Flex>
					<GridContainer>
						<BigGrid>{renderBoxes(4, false)}</BigGrid>
					</GridContainer>
					<GridContainer>
						<SmallGrid>{renderBoxes(9, false)}</SmallGrid>
					</GridContainer>

					<Knob checked={checked}>
						<GridContainer>
							{checked ? (
								<SmallGrid>{renderBoxes(9, true)}</SmallGrid>
							) : (
								<BigGrid>{renderBoxes(4, true)}</BigGrid>
							)}
						</GridContainer>
					</Knob>
				</Flex>
			</Background>
		</Container>
	)
}

GridSwitch.defaultProps = {
	forwardedRef: undefined,
}

export default withForwardRef<HTMLInputElement, GridSwitchProps>(GridSwitch)
