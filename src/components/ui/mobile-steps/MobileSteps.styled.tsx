import styled from '@emotion/styled'

export const StepBox = styled.div<{ checked?: boolean }>`
	flex: 1;
	user-select: none;
	background: ${props =>
		props.checked ? props.theme.colors.primary100 : props.theme.colors.dark200};
	border-radius: 8px;

	margin-right: 10px;

	height: 12px;

	&:last-child {
		margin-right: 0px;
	}
`

export const Circle = styled.div<{ isHighlighted?: boolean }>`
	align-items: center;
	justify-content: center;

	background-color: ${props =>
		props.isHighlighted
			? props.theme.colors.primary100
			: props.theme.colors.dark100};

	border-radius: 100%;
	padding: 4px;

	width: 32px;
	height: 32px;
`
