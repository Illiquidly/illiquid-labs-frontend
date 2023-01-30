import { Box, Flex, Text } from 'theme-ui'
import styled from '@emotion/styled'
import { Card } from 'components/ui'

export const ContentCardWrapper = styled.div`
	flex: 1;
	flex-direction: column;
`

export const ContentCard = styled(Card)`
	border-radius: 12px;
`
ContentCard.defaultProps = {
	sx: {
		p: ['16px', '16px', '24px', '24px'],
	},
}

export const ContentCardTitle = styled(Text)``

ContentCardTitle.defaultProps = {
	as: 'h3',
	variant: 'textXlSemibold',
	sx: { lineHeight: '32px' },
	color: 'neutral50',
}

export const ContentCardSubtitle = styled(Text)`
	padding: 2px 0 16px;
`

ContentCardSubtitle.defaultProps = {
	as: 'p',
	variant: 'textSmRegular',
	color: 'gray700',

	sx: { lineHeight: '20px' },
}

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

export const CardItemText = styled(Text)``

CardItemText.defaultProps = {
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

export const CardItemInput = styled.input`
	/* display: none; */
	opacity: 0;
	position: absolute;
	inset: 0;
	cursor: pointer;
`

export const FormWrapper = styled.div`
	display: flex;
	flex-direction: column;
`

export const RadioWrapper = styled(Flex)`
	gap: 8px;
`
RadioWrapper.defaultProps = {
	sx: {
		flexDirection: ['column', 'row'],
		width: ['100%', 'auto'],
	},
}

export const RadioWrapperSubtitle = styled(Text)``
RadioWrapperSubtitle.defaultProps = {
	sx: {
		display: ['block', 'none'],
		color: 'gray700',
		fontSize: '13px',
		lineHeight: '20px',
		fontFamily: 'Heebo',
	},
}

export const Label = styled.label`
	color: ${props => props.theme.colors.gray1000};
	font-weight: 600;
	font-size: 16px;
	line-height: 20px;
	display: block;
	padding-bottom: 6px;
`

export const MessageBox = styled(Box)``

MessageBox.defaultProps = {
	sx: {
		textAlign: 'center',
		fontFamily: 'Heebo',
		fontWeight: '500',
		fontSize: '16px',
		lineHeight: '24px',
		borderRadius: '8px',
		padding: ['12px 40px', null, '24px 12px'],
		color: 'gray800',
		backgroundColor: ['dark100', 'dark400'],
	},
}
