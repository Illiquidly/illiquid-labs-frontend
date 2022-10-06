import React from 'react'
import { Flex } from 'theme-ui'

/* eslint-disable no-param-reassign */
import { ModifierPhases } from '@popperjs/core'

import { noop, omit } from 'lodash'
import { usePopper } from 'react-popper'
import { useOnClickOutside } from 'utils/react/useOnClickOutside'
import { AccordionChevronDownIcon } from 'assets/icons/mixed'
import {
	DropdownContainer,
	DropdownContent,
	DropdownItem,
	Label,
} from './Select.styled'
import { Button } from '../button'

export type SelectOption = {
	label: string
	value: string
}
export interface SelectInputProps {
	error?: boolean
	onChange?: (value: string) => void
	options: SelectOption[]
	value?: string
	defaultOpen?: boolean
	dismissOnOutsideClick?: boolean
	disabled?: boolean
	dropdownReferenceElement?: HTMLDivElement | null
}

const popperModifiers = [
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
]

const Select = (props: SelectInputProps) => {
	const {
		value = [],
		onChange = noop,
		options = [],
		defaultOpen = false,
		dismissOnOutsideClick = true,
		dropdownReferenceElement,
		...inputProps
	} = omit(props, ['children'])

	const [isDropdownOpen, setIsDropDownOpen] = React.useState(
		inputProps.disabled ? false : defaultOpen
	)
	const [referenceElement, setReferenceElement] =
		React.useState<HTMLButtonElement | null>(null)
	const [popperElement, setPopperElement] =
		React.useState<HTMLDivElement | null>(null)

	const containerRef = React.useRef<HTMLDivElement>(null)

	const modifiers = React.useMemo(() => popperModifiers, [])

	const { styles, attributes } = usePopper(
		dropdownReferenceElement ?? referenceElement,
		popperElement,
		{
			modifiers,
		}
	)

	const handleDropdown = () => {
		if (inputProps.disabled) {
			return
		}
		setIsDropDownOpen(prev => !prev)
	}

	useOnClickOutside(containerRef, () => {
		if (dismissOnOutsideClick) {
			setIsDropDownOpen(false)
		}
	})

	return (
		<div style={{ display: 'flex', flex: 1 }} ref={containerRef}>
			<Button
				sx={{
					...(isDropdownOpen
						? {
								bg: 'dark400',
								boxShadow: '0px 0px 0px 4px rgba(63, 138, 224, 0.3)',
								borderColor: 'primary100',
						  }
						: {}),
				}}
				fullWidth
				onClick={() => handleDropdown()}
				variant='select'
				ref={setReferenceElement}
			>
				<Flex sx={{ flex: 1, justifyContent: 'space-between' }}>
					<Label>{options.find(x => x.value === value)?.label}</Label>
					<AccordionChevronDownIcon />
				</Flex>
			</Button>
			{isDropdownOpen && (
				<div
					ref={setPopperElement}
					style={{ ...styles.popper, zIndex: 3000 }}
					{...attributes.popper}
				>
					<DropdownContainer>
						<DropdownContent>
							{options.map(({ value: inputValue, label }) => {
								return (
									<DropdownItem
										onClick={() => {
											onChange(inputValue)
											handleDropdown()
										}}
										checked={value === inputValue}
										key={inputValue}
									>
										<div>{label}</div>
									</DropdownItem>
								)
							})}
						</DropdownContent>
					</DropdownContainer>
				</div>
			)}
		</div>
	)
}

Select.defaultProps = {
	dropdownReferenceElement: undefined,
}

export default Select
