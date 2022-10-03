/* eslint-disable no-param-reassign */
import { useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import { ModifierPhases } from '@popperjs/core'
import { AccordionChevronDownIcon } from 'assets/icons/mixed'
import React from 'react'
import { usePopper } from 'react-popper'
import { Flex } from 'theme-ui'
import { useOnClickOutside } from 'utils/react/useOnClickOutside'
import { Button } from '../button'
import { MultiSelectAccordionInput } from '../multi-select-accordion-input'
import { MultiSelectAccordionInputProps } from '../multi-select-accordion-input/MultiSelectAccordionInput'

const ButtonText = styled.div`
	font-family: 'Inter';
	font-style: normal;
	font-weight: 600;
	font-size: 16px;
	line-height: 24px;
`

export const ButtonContent = styled.div``

interface DropdownMultiselectProps extends MultiSelectAccordionInputProps {
	defaultExpanded?: boolean
	label?: string
	disabled?: boolean
	children?: React.ReactNode
	dropdownReferenceElement?: HTMLDivElement | null
}

function DropdownMultiselect(props: DropdownMultiselectProps) {
	const {
		label,
		dismissOnOutsideClick,
		defaultExpanded,
		dropdownReferenceElement,

		...rest
	} = props

	const [_referenceElement, _setReferenceElement] =
		React.useState<HTMLButtonElement | null>(null)
	const [popperElement, setPopperElement] =
		React.useState<HTMLDivElement | null>(null)

	const theme = useTheme()

	const containerRef = React.useRef<HTMLDivElement>(null)

	const [expanded, setExpanded] = React.useState(defaultExpanded)

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

	const { styles, attributes } = usePopper(
		dropdownReferenceElement ?? _referenceElement,
		popperElement,
		{
			modifiers,
		}
	)

	useOnClickOutside(
		containerRef,
		() => dismissOnOutsideClick && setExpanded(false)
	)

	return (
		<div style={{ flex: 1, display: 'flex' }} ref={containerRef}>
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
				ref={_setReferenceElement}
				{...rest}
			>
				<Flex sx={{ flex: 1, justifyContent: 'space-between' }}>
					<ButtonText>{label}</ButtonText>
					<AccordionChevronDownIcon />
				</Flex>
			</Button>
			{expanded && (
				<div
					ref={setPopperElement}
					style={{ ...styles.popper, zIndex: theme.zIndices.dropdown }}
					{...attributes.popper}
				>
					<MultiSelectAccordionInput {...rest} />
				</div>
			)}
		</div>
	)
}

export default DropdownMultiselect

DropdownMultiselect.defaultProps = {
	defaultExpanded: false,
	disabled: false,
	label: '',
	children: undefined,
	dropdownReferenceElement: undefined,
	// eslint-disable-next-line react/default-props-match-prop-types
	dismissOnOutsideClick: true,
}
