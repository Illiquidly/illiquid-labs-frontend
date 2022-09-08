import styled from '@emotion/styled'
import { Box } from 'theme-ui'

export const StyledChip = styled(Box)`
	padding: 4px 12px;
	display: flex;
	align-items: center;
	gap: 4px;
	background-color: ${props => props.theme.colors.dark100};
	filter: drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.06))
		drop-shadow(0px 1px 3px rgba(0, 0, 0, 0.1));
`

StyledChip.defaultProps = {
	sx: {
		borderRadius: ['10px', '10px', '100px'],
		borderWidth: ['0', '0', '1px'],
		borderStyle: [null, null, 'solid'],
		borderColor: [null, null, 'dark500'],
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
