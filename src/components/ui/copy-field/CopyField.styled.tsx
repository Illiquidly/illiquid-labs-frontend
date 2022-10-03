import styled from '@emotion/styled'
import { Flex } from 'theme-ui'

export const CopyFieldContainer = styled(Flex)`
	& span {
		padding: 8px 0;
		flex-grow: 1;
		font-weight: 700;
		font-size: 16px;
		line-height: 24px;
		word-break: break-all;
	}
`

CopyFieldContainer.defaultProps = {
	sx: {
		backgroundColor: 'dark100',
		padding: '0 12px',
		color: 'gray800',
		borderRadius: '6px',
	},
}

export const ActionButton = styled.button<{ copyText?: string }>`
	/* Reset button */
	background-color: transparent;
	border-width: 0;
	font-family: inherit;
	font-size: inherit;
	font-style: inherit;
	font-weight: inherit;
	line-height: inherit;

	position: relative;

	padding: 0 10px;
	cursor: pointer;
	transition: 0.2s all ease-in;

	&:hover {
		background-color: ${props => props.theme.colors.dark200};
	}

	&:active {
		background-color: ${props => props.theme.colors.dark300};
	}

	&:hover:after {
		content: attr(data-copyText);
		position: absolute;
		bottom: -20px;
		left: 50%;
		transform: translateX(-50%);

		font-size: 12px;

		color: white;
		opacity: 0.7;
	}
`
