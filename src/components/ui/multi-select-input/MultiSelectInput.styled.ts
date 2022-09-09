import styled from '@emotion/styled'
import {
	MultiSelectInputContainerProps,
	MultiSelectProps,
} from './MultiSelectInput'

export const Container = styled.div<MultiSelectInputContainerProps>`
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

export const MultiSelectInputStyled = styled.input<MultiSelectProps>`
	flex: 1;
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
	display: flex;
	flex-direction: column;
	overflow: hidden;
	background: ${props => props.theme.colors.dark100};

	height: 208px;

	border: 1px solid ${props => props.theme.colors.dark500};

	border-radius: 8px;
`

export const DropdownContent = styled.div`
	overflow: scroll;
`

export const DropdownTitle = styled.div`
	padding: 14px 12px;
	padding-top: 18px;

	color: rgba(255, 255, 255, 0.5);
`

export const DropdownItem = styled.div<{ checked?: boolean }>`
	padding: 14px 12px;
	background: ${props =>
		props.checked ? props.theme.colors.primary600 : props.theme.colors.dark100};
`
