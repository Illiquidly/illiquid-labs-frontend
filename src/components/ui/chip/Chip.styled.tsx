import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { Box } from 'theme-ui'

export const StyledChip = styled(Box, {
	shouldForwardProp: prop => prop !== 'flexGrowItems' && prop !== 'isViewMode',
})<{
	isViewMode?: boolean
	flexGrowItems?: boolean
}>`
	padding: ${props => (props.isViewMode ? '6px 12px' : '4px 12px')};
	display: flex;
	align-items: center;
	gap: 4px;
	background-color: ${props => props.theme.colors.dark100};
	filter: drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.06))
		drop-shadow(0px 1px 3px rgba(0, 0, 0, 0.1));

	${props =>
		props.flexGrowItems &&
		css`
			flex-grow: 1;
			flex-shrink: 1;
			justify-content: center;
		`}
`

StyledChip.defaultProps = {
	sx: {
		borderRadius: ['10px', '10px', '100px'],
		borderWidth: ['0', '1px'],
		borderStyle: [null, 'solid'],
		borderColor: [null, 'dark500'],
		flex: ['0 0 auto', '0 0 auto', '0 1 auto'],
	},
}

export const ChipText = styled.p`
	margin: 0;
	font-weight: 500;
	font-size: 14px;
	line-height: 20px;
	color: ${props => props.theme.colors.gray1000};
	display: flex;
	align-items: center;
`

export const BigChipText = styled.p`
	margin: 0;
	font-weight: 500;
	font-size: 16px;
	line-height: 24px;
	color: ${props => props.theme.colors.gray1000};
	display: flex;
	align-items: center;
	gap: 8px;
	text-align: center;
	word-break: break-word;
`

export const CloseIconButton = styled(Box)`
	height: 20px;
	cursor: pointer;
	path {
		transition: stroke 0.2s ease-in;
	}
`

CloseIconButton.defaultProps = {
	sx: {
		borderRadius: ['50%', '50%', '0'],
		backgroundColor: ['dark500', 'dark500', 'transparent'],
		path: {
			stroke: ['gray1000', 'gray1000', 'dark500'],
			width: '10px',
		},
		hover: {
			path: {
				stroke: ['gray1000'],
			},
		},
	},
}

export const VisibilityChipWrapper = styled.div`
	display: flex;

	& div:first-of-type {
		border-top-right-radius: 0;
		border-bottom-right-radius: 0;
	}
	& div:last-of-type {
		border-top-left-radius: 0;
		border-bottom-left-radius: 0;
		margin-left: -1px; /* because of double border */
		word-break: break-all;
		/* flex: 1; */
		flex-shrink: 1;

		@media screen and (max-width: ${props => props.theme.breakpoints[0]}) {
			margin-left: 2px;
		}
	}
`
