import { InputSearchIcon } from 'assets/icons/mixed'
import InputDismissIcon from 'assets/icons/mixed/components/InputDismissIcon'
import { noop } from 'lodash'
import React from 'react'
import { Flex } from 'theme-ui'
import { useOnClickOutside } from 'utils/react/useOnClickOutside'
import { Checkbox } from '../checkbox'
import {
	AccordionCard,
	AccordionItem,
	AccordionTitle,
	CheckboxContainer,
	Container,
	ContentWrapper,
	DismissIconContainer,
	DividerLine,
	ExtraLabel,
	IconContainer,
	Label,
	MultiSelectAccordionInputStyled,
	SearchIconContainer,
} from './MultiSelectAccordionInput.styled'

export type MultiSelectAccordionInputOption = {
	label: string
	value: string
	extraLabel?: string
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
export interface MultiSelectAccordionInputProps {
	error?: boolean
	options?: MultiSelectAccordionInputOption[]
	onChange?: (o: MultiSelectAccordionInputOption[]) => void
	value?: MultiSelectAccordionInputOption[]
	placeholder?: string
	defaultSearch?: string
	accordionTitle?: string
	dismissOnOutsideClick?: boolean
	searchStrategy?: SearchStrategy
	onDismiss?: () => void
	style?: React.CSSProperties
	dropdownStyle?: React.CSSProperties
}

export interface MultiSelectAccordionInputContainerProps {
	error?: boolean
	disabled?: boolean
}

const MultiSelectAccordionInput = React.forwardRef<
	HTMLInputElement,
	Spread<
		React.InputHTMLAttributes<HTMLInputElement>,
		MultiSelectAccordionInputProps
	>
>((props, ref) => {
	const {
		style,
		children,
		value = [],
		onChange = noop,
		onDismiss = noop,
		options = [],
		defaultSearch = '',
		accordionTitle = '',
		dismissOnOutsideClick = false,
		dropdownStyle,
		placeholder,
		searchStrategy = ({ label, inputValue }) =>
			!inputValue || label.toLowerCase().match(`^${inputValue.toLowerCase()}.*$`),
		...inputProps
	} = props

	const [search, setSearch] = React.useState(defaultSearch)

	const inputRef = React.useRef<HTMLInputElement>(null)

	const containerRef = React.useRef<HTMLDivElement>(null)

	React.useImperativeHandle(ref, () => inputRef.current as HTMLInputElement)

	const filteredOptions = React.useMemo(
		() => options.filter(o => searchStrategy({ ...o, inputValue: search })),
		[search, options, searchStrategy]
	)

	const handleClick = () => {
		if (inputProps.disabled) {
			return
		}
		inputRef?.current?.click()
	}

	// eslint-disable-next-line no-underscore-dangle
	const _onDismiss = () => {
		setSearch('')
		onDismiss()
	}

	const handleCheck = (option: { value: string | number; label: string }) => {
		const checked = value.some(o => o.value === option.value)

		if (checked) {
			onChange?.(value.filter(o => o.value !== option.value))
			return
		}
		onChange?.([...value, option])
	}

	useOnClickOutside(containerRef, () => dismissOnOutsideClick && _onDismiss())

	return (
		<AccordionCard style={style} ref={containerRef}>
			<Flex sx={{ mx: '6px' }}>
				<Container
					disabled={props.disabled}
					error={props.error}
					onClick={handleClick}
				>
					<IconContainer
						sx={{ mr: '10px' }}
						onClick={() => inputRef.current?.focus()}
					>
						<SearchIconContainer>
							<InputSearchIcon />
						</SearchIconContainer>
					</IconContainer>
					<MultiSelectAccordionInputStyled
						{...inputProps}
						placeholder={placeholder}
						value={search}
						onChange={e => setSearch(e.target.value)}
						ref={inputRef}
					>
						{children}
					</MultiSelectAccordionInputStyled>
					<IconContainer>
						{search && (
							<DismissIconContainer onClick={_onDismiss}>
								<InputDismissIcon />
							</DismissIconContainer>
						)}
					</IconContainer>
				</Container>
			</Flex>
			<Flex>
				<DividerLine />
			</Flex>
			<Flex sx={{ overflow: 'scroll' }}>
				<ContentWrapper style={dropdownStyle}>
					<Flex sx={{ width: '100%', flexDirection: 'column' }}>
						<AccordionTitle>{accordionTitle}</AccordionTitle>
						{filteredOptions.map(({ value: inputValue, label, extraLabel }) => {
							const checked = value.some(o => o.value === inputValue)
							return (
								<AccordionItem checked={checked} key={inputValue}>
									<Flex
										onClick={() =>
											handleCheck({
												value: inputValue,
												label,
											})
										}
									>
										<CheckboxContainer>
											<Checkbox onChange={noop} checked={checked} />
										</CheckboxContainer>
										<Label>{label}</Label>
									</Flex>
									<ExtraLabel>{extraLabel}</ExtraLabel>
								</AccordionItem>
							)
						})}
					</Flex>
				</ContentWrapper>
			</Flex>
		</AccordionCard>
	)
})

export default MultiSelectAccordionInput
