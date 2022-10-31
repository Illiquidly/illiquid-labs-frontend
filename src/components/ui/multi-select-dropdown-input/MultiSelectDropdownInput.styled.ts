import styled from '@emotion/styled'
import { Flex } from 'theme-ui'

export const Container = styled.div<{
	error?: boolean
	disabled?: boolean
}>`
	height: 42px;
	display: inline-flex;
	width: 100%;
	border: 1.5px solid
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
    border: 1.5px solid ${props.theme.colors.dark500}
`}

	&:hover {
		margin: 0;
		outline: none;
		border: ${props =>
			`1.5px solid ${
				props.error ? props.theme.colors.error100 : props.theme.colors.primary100
			}`};
	}
	&:focus,
	&:focus-within {
		border: ${props =>
			`1.5px solid ${
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
			`1.5px solid ${
				props.error ? props.theme.colors.error100 : props.theme.colors.primary100
			}`};
		box-shadow: rgba(0, 0, 0, 0.8) 0 1px;
	}
`

export const MultiSelectDropdownInputStyled = styled.input`
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

export const DropdownContainer = styled.div`
	z-index: ${props => props.theme.zIndices.dropdown};
	display: flex;
	flex-direction: column;
	overflow: hidden;
	background: ${props => props.theme.colors.dark100};

	max-height: 208px;

	border: 1px solid ${props => props.theme.colors.dark500};

	border-radius: 8px;
`

export const DropdownContent = styled.div`
	overflow: scroll;
`

export const DropdownTitle = styled.div`
	padding-left: 12px;
	padding-right: 12px;
	padding-top: 18px;
	padding-bottom: 8px;

	color: rgba(255, 255, 255, 0.5);
`

export const DropdownItem = styled.div<{ checked?: boolean }>`
	padding: 14px 12px;
	display: flex;
	align-items: center;
	justify-content: space-between;

	&:hover {
		cursor: pointer;
	}

	background: ${props =>
		props.checked ? props.theme.colors.primary600 : props.theme.colors.dark100};
`

export const Circle = styled.div`
	display: flex;
	flex: 1;
	align-items: center;
	justify-content: center;
	border-radius: 100%;

	background: #2688eb;
`

export const IconContainer = styled(Flex)`
	min-width: 20px;
	min-height: 20px;

	&:hover {
		opacity: 0.8;
	}
`
