/* eslint-disable no-param-reassign */
import InputDismissIcon from 'assets/icons/mixed/components/InputDismissIcon'
import React from 'react'
import { noop } from 'lodash'
import { useOnClickOutside } from 'utils/react/useOnClickOutside'
import { InputSearchIcon } from 'assets/icons/mixed'
import { useTheme } from '@emotion/react'
import { Box, Flex } from 'theme-ui'
import {
	AccordionCard,
	ContentWrapper,
	AccordionItem,
	AccordionTitle,
	CheckboxContainer,
	Container,
	DismissIconContainer,
	DividerLine,
	IconContainer,
	MultiSelectAccordionInputStyled,
	SearchIconContainer,
} from './MultiSelectAccordionInput.styled'
import { Checkbox } from '../checkbox'

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
	defaultSearch?: string
	accordionTitle?: string
	dismissOnOutsideClick?: boolean
	searchStrategy?: SearchStrategy
	onDismiss?: () => void
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
		children,
		value = [],
		onChange = noop,
		onDismiss = noop,
		options = [],
		defaultSearch = '',
		accordionTitle = '',
		dismissOnOutsideClick = false,
		searchStrategy = ({ label, inputValue }) =>
			!inputValue || label.toLowerCase().match(`^${inputValue.toLowerCase()}.*$`),
		...inputProps
	} = props

	const theme = useTheme()

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

	useOnClickOutside(containerRef, () => dismissOnOutsideClick && _onDismiss())

	return (
		<AccordionCard ref={containerRef}>
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
				<ContentWrapper>
					<Flex sx={{ width: '100%', flexDirection: 'column' }}>
						<AccordionTitle>{accordionTitle}</AccordionTitle>
						{filteredOptions.map(({ value: inputValue, label, extraLabel }) => {
							const checked = value.some(o => o.value === inputValue)
							return (
								<AccordionItem checked={checked} key={inputValue}>
									<CheckboxContainer>
										<Checkbox
											backgroundStyle={{
												...(!checked
													? { border: `2px solid ${theme.colors.dark500}` }
													: {}),
											}}
											onChange={e =>
												onCheck(!e.target.checked, {
													value: inputValue,
													label,
												})
											}
											checked={checked}
										/>
									</CheckboxContainer>
									<Box sx={{ flex: 1, ml: '2px' }}>{label}</Box>
									<Box>{extraLabel}</Box>
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
