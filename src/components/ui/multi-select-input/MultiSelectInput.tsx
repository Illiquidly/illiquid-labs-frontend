/* eslint-disable no-param-reassign */
import InputDismissIcon from 'assets/icons/mixed/components/InputDismissIcon'
import React from 'react'
import { Flex } from 'theme-ui'
import { usePopper } from 'react-popper'
import { ModifierPhases } from '@popperjs/core'
import {
	Container,
	DismissIconContainer,
	DropdownContainer,
	DropdownContent,
	DropdownItem,
	DropdownTitle,
	MultiSelectInputStyled,
} from './MultiSelectInput.styled'

export interface MultiSelectProps
	extends React.InputHTMLAttributes<HTMLInputElement> {
	error?: boolean
}

export interface MultiSelectInputContainerProps {
	error?: boolean
	disabled?: boolean
}

const MultiSelectInput = React.forwardRef<HTMLInputElement, MultiSelectProps>(
	(props, ref) => {
		const { children, ...rest } = props
		const [isDropdownOpen, setIsDropDownOpen] = React.useState(false)
		const [referenceElement, setReferenceElement] =
			React.useState<HTMLDivElement | null>(null)
		const [popperElement, setPopperElement] =
			React.useState<HTMLDivElement | null>(null)

		const inputRef = React.useRef<HTMLInputElement>(null)

		const modifiers = React.useMemo(
			() => [
				{
					name: 'sameWidth',
					enabled: true,
					phase: 'beforeWrite' as ModifierPhases,
					requires: ['computeStyles'],
					fn({ state }) {
						state.styles.popper.minWidth = `${state.rects.reference.width}px`
					},
					effect({ state }) {
						state.elements.popper.style.minWidth = `${state.elements.reference.offsetWidth}px`
					},
				},
				{
					name: 'offset',
					options: {
						offset: () => [0, 6],
					},
				},
			],
			[]
		)

		const { styles, attributes } = usePopper(referenceElement, popperElement, {
			modifiers,
		})

		const handleClick = () => {
			if (isDropdownOpen) {
				return
			}
			inputRef?.current?.click()
			setIsDropDownOpen(true)
		}

		const onDismiss = () => {
			if (inputRef.current) {
				inputRef.current.value = ''
			}

			setIsDropDownOpen(false)
		}

		React.useImperativeHandle(ref, () => inputRef.current as HTMLInputElement)
		return (
			<>
				<Container
					disabled={props.disabled}
					error={props.error}
					onClick={handleClick}
					ref={setReferenceElement}
				>
					<MultiSelectInputStyled {...rest} ref={inputRef}>
						{children}
					</MultiSelectInputStyled>
					<Flex
						sx={{
							width: '20px',
							height: '20px',
						}}
					>
						{isDropdownOpen && (
							<DismissIconContainer onClick={onDismiss}>
								<InputDismissIcon />
							</DismissIconContainer>
						)}
					</Flex>
					{isDropdownOpen && (
						<div ref={setPopperElement} style={styles.popper} {...attributes.popper}>
							<DropdownContainer>
								<DropdownContent>
									<DropdownTitle>NFT Name</DropdownTitle>

									<DropdownItem>Galactic Punks</DropdownItem>
									<DropdownItem>Fox International</DropdownItem>
									<DropdownItem>Fox NFT#1</DropdownItem>
									<DropdownItem>Fox NFT#2</DropdownItem>
									<DropdownItem>Fox NFT#3</DropdownItem>
								</DropdownContent>
							</DropdownContainer>
						</div>
					)}
				</Container>
			</>
		)
	}
)

export default MultiSelectInput
