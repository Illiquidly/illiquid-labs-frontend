import styled from '@emotion/styled'
import { Flex } from 'theme-ui'

export const Container = styled.div<{
	error?: boolean
	disabled?: boolean
}>`
	display: inline-flex;
	width: 100%;
	border: 2px solid
		${props =>
			props.error ? props.theme.colors.error100 : props.theme.colors.dark500};
	padding-inline: 14px;
	padding-block: 10px;
	background: ${props => props.theme.colors.dark400};
	border-radius: 8px;

	${props =>
		props.disabled &&
		`
    cursor: not-allowed;
    border: 2px solid ${props.theme.colors.dark500}
`}

	&:hover {
		margin: 0;
		outline: none;
		border: ${props =>
			`2px solid ${
				props.error ? props.theme.colors.error100 : props.theme.colors.primary100
			}`};
	}
	&:focus,
	&:focus-within {
		border: ${props =>
			`2px solid ${
				props.error ? props.theme.colors.error100 : props.theme.colors.primary100
			}`};
		box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05),
			0px 0px 0px 4px rgba(63, 138, 224, 0.18);
		outline: 0;
	}
	&:active {
		outline: none;
		margin: 0;
		border: ${props =>
			`2px solid ${
				props.error ? props.theme.colors.error100 : props.theme.colors.primary100
			}`};
		box-shadow: rgba(0, 0, 0, 0.8) 0 1px;
	}
`
export const AccordionCard = styled.div`
	flex: 1;
	padding: 18px 12px;
	display: flex;
	flex-direction: column;
	gap: 16px;

	background: ${props => props.theme.colors.dark300};

	border: 2px solid ${props => props.theme.colors.dark500};
	border-radius: 8px;
`

export const DividerLine = styled.div`
	margin-left: 6px;
	margin-right: 6px;
	flex: 1;
	height: 1px;
	background: ${props => props.theme.colors.dark500};
`

export const MultiSelectAccordionInputStyled = styled.input`
	width: 100%;
	font-family: 'Inter';
	font-style: normal;
	font-weight: 500;
	font-size: 14px;

	&::placeholder {
		color: ${props => props.theme.colors.gray600};
		opacity: 1;
	}
	background: ${props => props.theme.colors.dark400};
	border: 0;

	&:disabled {
		cursor: not-allowed;
	}

	&:focus {
		outline: none;
	}

	color: ${props => props.theme.colors.natural50};
`

export const DismissIconContainer = styled.div`
	flex: 1;
	border-radius: 100%;
	display: flex;
	align-items: center;
	justify-content: center;

	&:hover {
		cursor: pointer;
	}

	background: ${props => props.theme.colors.dark300};
`

export const SearchIconContainer = styled.div`
	flex: 1;
	display: flex;
	align-items: center;
	justify-content: center;

	&:hover {
		cursor: pointer;
	}
`

export const IconContainer = styled(Flex)`
	min-width: 20px;
	min-height: 20px;

	&:hover {
		opacity: 0.8;
	}
`

export const ContentWrapper = styled.div`
	width: 100%;
	max-height: 172px;
	transition: all 0.35s ease-in-out;
	display: flex;
	margin: 0 6px;
	justify-content: flex-start;
`

export const AccordionTitle = styled.div`
	font-style: normal;
	font-weight: 500;
	font-size: 16px;
	line-height: 24px;
	color: rgba(255, 255, 255, 0.5);
`

export const AccordionItem = styled.div<{ checked?: boolean }>`
	flex: 1;
	padding: 14px 0px;
	display: flex;
	align-items: center;
	justify-content: space-between;
`

export const CheckboxContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	margin-right: 10px;
`

export const ExtraLabel = styled.div`
	text-align: end;
	flex: 1;
	font-style: normal;
	font-weight: 400;
	font-size: 14px;
	line-height: 24px;

	color: ${props => props.theme.colors.secondary300};
`

export const Label = styled.div`
	cursor: pointer;
	font-style: normal;
	font-weight: 500;
	font-size: 16px;
	line-height: 24px;
`
