import styled from '@emotion/styled'

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
	overflow-y: auto;
`

export const DropdownItem = styled.div<{ checked?: boolean }>`
	padding: 14px 12px;
	display: flex;
	align-items: center;
	justify-content: space-between;

	background: ${props =>
		props.checked ? props.theme.colors.primary600 : props.theme.colors.dark100};

	&:hover {
		background: ${props => props.theme.colors.dark300};
		cursor: pointer;
	}
`

export const Label = styled.div`
	font-family: 'Inter';
	font-style: normal;
	font-weight: 600;
	font-size: 16px;
	line-height: 24px;
`
