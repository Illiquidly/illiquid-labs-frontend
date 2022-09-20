/* eslint-disable no-param-reassign */
import styled from '@emotion/styled'
import { ModifierPhases } from '@popperjs/core'
import { AccordionChevronDownIcon } from 'assets/icons/mixed'
import { withForwardRef } from 'hoc'
import React from 'react'
import { usePopper } from 'react-popper'
import { Flex } from 'theme-ui'
import { Button } from '../button'
// import { MultiSelectAccordionInput } from '../multi-select-accordion-input'

const ButtonText = styled.div`
	font-family: 'Inter';
	font-style: normal;
	font-weight: 600;
	font-size: 16px;
	line-height: 24px;
`

export const ButtonContent = styled.div``

interface DropdownRef {
	close: () => void
	open: () => void
}

interface DropdownProps {
	// forwardedRef: React.RefObject<>
	defaultExpanded?: boolean
	label?: string
	disabled?: boolean
	children?: React.ReactNode
	forwardedRef?: React.RefObject<DropdownRef>
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

function Dropdown(props: DropdownProps) {
	const {
		// error,
		// options,
		label,
		// selected,
		// setValue,
		// dropdownInFullscreen,
		defaultExpanded,
		forwardedRef,
		children,
		...rest
	} = props

	const [referenceElement, setReferenceElement] =
		React.useState<HTMLButtonElement | null>(null)
	const [popperElement, setPopperElement] =
		React.useState<HTMLDivElement | null>(null)

	const containerRef = React.useRef<HTMLDivElement>(null)

	// const dropdownRef = React.useRef<React.RefObject<DropdownRef>>(null)

	const [expanded, setExpanded] = React.useState(defaultExpanded)

	const modifiers = React.useMemo(() => popperModifiers, [])

	// React.useImperativeHandle(forwardedRef, () => dropdownRef.current)

	const { styles, attributes } = usePopper(referenceElement, popperElement, {
		modifiers,
	})

	console.warn(forwardedRef)

	return (
		<div ref={containerRef}>
			<Button
				sx={{
					...(expanded
						? {
								bg: 'dark400',
								boxShadow: '0px 0px 0px 4px rgba(63, 138, 224, 0.3)',
								borderColor: 'primary100',
						  }
						: {}),
				}}
				fullWidth
				onClick={() => setExpanded(prevExpanded => !prevExpanded)}
				variant='select'
				ref={setReferenceElement as React.Ref<HTMLButtonElement>}
				{...rest}
			>
				<Flex sx={{ flex: 1, justifyContent: 'space-between' }}>
					<ButtonText>{label}</ButtonText>
					<AccordionChevronDownIcon />
				</Flex>
			</Button>
			{expanded && (
				<div ref={setPopperElement} style={styles.popper} {...attributes.popper}>
					{children}
				</div>
			)}
		</div>
	)
}

export default withForwardRef<DropdownRef, DropdownProps>(Dropdown)

Dropdown.defaultProps = {
	defaultExpanded: false,
	disabled: false,
	label: '',
	forwardedRef: undefined,
	children: undefined,
}
