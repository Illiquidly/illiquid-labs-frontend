import styled from '@emotion/styled'
import { Flex, Text } from 'theme-ui'

export const CardItem = styled(Flex)`
	flex: 1;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	border-radius: 8px;
	border: 2px solid ${props => props.theme.colors.secondary400};
	cursor: pointer;
	position: relative;
	transition: background-color 0.2s ease-in;

	&:hover {
		background-color: ${props => props.theme.colors.primary600};
	}
`

CardItem.defaultProps = {
	sx: {
		py: ['46px'],
	},
	backgroundColor: 'dark100',
}

export const CardItemInput = styled.input`
	/* display: none; */
	opacity: 0;
	position: absolute;
	inset: 0;
	cursor: pointer;
`

export const CardItemTitle = styled(Text)``

CardItemTitle.defaultProps = {
	as: 'h4',
	sx: {
		fontFamily: 'Heebo',
		fontSize: '16px',
		lineHeight: '24px',
		fontWeight: 500,
		textAlign: 'center',
		padding: '4px 12px 0',
	},
	color: 'natural50',
}
export const CardItemSubtitle = styled(Text)``

CardItemSubtitle.defaultProps = {
	as: 'p',
	sx: {
		fontFamily: 'Heebo',
		fontSize: '14px',
		lineHeight: '20px',
		fontWeight: 400,
		textAlign: 'center',
		padding: '4px 12px',
	},
	color: 'natural200',
}
