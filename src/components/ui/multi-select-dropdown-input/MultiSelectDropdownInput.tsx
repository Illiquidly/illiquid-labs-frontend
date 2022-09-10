/* eslint-disable no-param-reassign */
import InputDismissIcon from 'assets/icons/mixed/components/InputDismissIcon'
import React from 'react'
import { usePopper } from 'react-popper'
import { ModifierPhases } from '@popperjs/core'
import { noop } from 'lodash'
import { CheckboxCheckedIcon } from 'assets/icons/mixed'
import { useOnClickOutside } from 'utils/react/useOnClickOutside'
import {
	Circle,
	Container,
	DismissIconContainer,
	DropdownContainer,
	DropdownContent,
	DropdownItem,
	DropdownTitle,
	IconContainer,
	MultiSelectDropdownInputStyled,
} from './MultiSelectDropdownInput.styled'

export type MultiSelectDropdownInputOption = {
	label: string
	value: string
}

type Spread<L, R> = R & Pick<L, Exclude<keyof L, keyof R>>

type SearchStrategy = ({
	label,
	value,
	inputValue,
}: {
	label: string
	value: string
	inputValue: string
}) => boolean
export interface MultiSelectDropdownInputProps {
	error?: boolean
	options?: MultiSelectDropdownInputOption[]
	onChange?: (o: MultiSelectDropdownInputOption[]) => void
	value?: MultiSelectDropdownInputOption[]
	defaultSearch?: string
	defaultOpen?: boolean
	dropdownTitle?: string
	dismissOnOutsideClick?: boolean
	searchStrategy?: SearchStrategy
}

export interface MultiSelectDropdownInputContainerProps {
	error?: boolean
	disabled?: boolean
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

const MultiSelectDropdownInput = React.forwardRef<
	HTMLInputElement,
	Spread<
		React.InputHTMLAttributes<HTMLInputElement>,
		MultiSelectDropdownInputProps
	>
>((props, ref) => {
	const {
		children,
		value = [],
		onChange = noop,
		options = [],
		defaultOpen = false,
		defaultSearch = '',
		dropdownTitle = '',
		dismissOnOutsideClick = false,
		searchStrategy = ({ label, inputValue }) =>
			!inputValue || label.toLowerCase().match(`^${inputValue.toLowerCase()}.*$`),
		...inputProps
	} = props

	const [search, setSearch] = React.useState(defaultSearch)
	const [isDropdownOpen, setIsDropDownOpen] = React.useState(
		inputProps.disabled ? false : defaultOpen
	)
	const [referenceElement, setReferenceElement] =
		React.useState<HTMLDivElement | null>(null)
	const [popperElement, setPopperElement] =
		React.useState<HTMLDivElement | null>(null)

	const inputRef = React.useRef<HTMLInputElement>(null)

	const containerRef = React.useRef<HTMLDivElement>(null)

	const modifiers = React.useMemo(() => popperModifiers, [])

	React.useImperativeHandle(ref, () => inputRef.current as HTMLInputElement)

	const { styles, attributes } = usePopper(referenceElement, popperElement, {
		modifiers,
	})

	const filteredOptions = React.useMemo(
		() => options.filter(o => searchStrategy({ ...o, inputValue: search })),
		[search, options, searchStrategy]
	)

	const handleClick = () => {
		if (isDropdownOpen || inputProps.disabled) {
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

	const onCheck = (
		checked,
		option: { value: string | number; label: string }
	) => {
		if (checked) {
			onChange?.(value.filter(o => o.value !== option.value))
			return
		}
		onChange?.([...value, option])
	}

	useOnClickOutside(containerRef, () => dismissOnOutsideClick && onDismiss())

	return (
		<div ref={containerRef}>
			<Container
				disabled={props.disabled}
				error={props.error}
				onClick={handleClick}
				ref={setReferenceElement}
			>
				<MultiSelectDropdownInputStyled
					{...inputProps}
					value={search}
					onChange={e => setSearch(e.target.value)}
					ref={inputRef}
				>
					{children}
				</MultiSelectDropdownInputStyled>
				<IconContainer>
					{isDropdownOpen && (
						<DismissIconContainer onClick={onDismiss}>
							<InputDismissIcon />
						</DismissIconContainer>
					)}
				</IconContainer>
				{isDropdownOpen && (
					<div ref={setPopperElement} style={styles.popper} {...attributes.popper}>
						<DropdownContainer>
							<DropdownContent>
								<DropdownTitle>{dropdownTitle}</DropdownTitle>

								{filteredOptions.map(({ value: inputValue, label }) => {
									const checked = value.some(o => o.value === inputValue)
									return (
										<DropdownItem
											onClick={() =>
												onCheck(checked, {
													value: inputValue,
													label,
												})
											}
											checked={checked}
											key={inputValue}
										>
											<div>{label}</div>

											<IconContainer>
												{checked && (
													<Circle>
														<CheckboxCheckedIcon width='9.17px' height='6.25px' />
													</Circle>
												)}
											</IconContainer>
										</DropdownItem>
									)
								})}
							</DropdownContent>
						</DropdownContainer>
					</div>
				)}
			</Container>
		</div>
	)
})

export default MultiSelectDropdownInput
