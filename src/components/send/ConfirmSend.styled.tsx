import styled from '@emotion/styled'
import { Card } from 'components/ui'

import { Box, Flex, Text } from 'theme-ui'

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

export const FormWrapper = styled.div`
	display: flex;
	flex-direction: column;
`

export const RadioWrapper = styled(Flex)`
	gap: 8px;
`
RadioWrapper.defaultProps = {
	sx: {},
}

export const Label = styled.label`
	color: ${props => props.theme.colors.gray1000};
	font-weight: 600;
	font-size: 16px;
	line-height: 20px;
	display: block;
	padding-bottom: 6px;
`

export const ChipsWrapper = styled(Flex)`
	/* REMOVE SCROLLBAR */
	-ms-overflow-style: none; /* Internet Explorer 10+ */
	scrollbar-width: none; /* Firefox */
	&::-webkit-scrollbar {
		width: 0; /* Remove scrollbar space */
		height: 0; /* Remove scrollbar height issue */
	}
`

ChipsWrapper.defaultProps = {
	mt: ['8px', '8px', '4px'],
	sx: {
		gap: ['4px', '4px', '2px'],
		flexWrap: ['nowrap', 'nowrap', 'wrap'],
		overflowX: ['auto', 'auto', 'visible'],
	},
}

export const EditButton = styled.button`
	font-family: 'Heebo';
	font-weight: 500;
	font-size: 14px;
	line-height: 20px;
	text-decoration: underline;
	color: ${props => props.theme.colors.primary400};
	padding-left: 12px;
`

export const StepTitle = styled.h3`
	font-weight: 600;
	font-size: 16px;
	line-height: 24px;
	margin: 0;
	padding-bottom: 12px;
	color: ${props => props.theme.colors.gray1000};

	& span {
		margin-left: 4px;
		padding: 2px 12px;
		background-color: rgba(45, 115, 255, 0.4);
		color: ${props => props.theme.colors.natural50};
		border-radius: 42px;
	}
`

export const NoContent = styled.p`
	color: ${props => props.theme.colors.gray500};
	font-size: 16px;
	line-height: 24px;
	margin: 0;
`

export const NFTCardsContainer = styled(Box)``

NFTCardsContainer.defaultProps = {
	sx: {
		display: ['flex', 'grid'],
		gridTemplateColumns: [null, 'repeat(3, 1fr)'],
		overflowX: 'auto',
		flexWrap: 'nowrap',
		gap: '8px',
		paddingBottom: ['24px', '48px'],
	},
}

export const SuccessTitle = styled(Text)`
	font-weight: 600;
	font-size: 20px;
	line-height: 32px;
	text-align: center;
	color: ${props => props.theme.colors.gray1000};
	padding-bottom: 8px;
`

SuccessTitle.defaultProps = {
	as: 'h3',
}

export const SuccessMessage = styled(Text)`
	font-size: 14px;
	line-height: 20px;
	text-align: center;
	color: ${props => props.theme.colors.gray700};
	padding-bottom: 16px;
`

SuccessMessage.defaultProps = {
	as: 'p',
}

export const SuccessLabel = styled.p`
	color: ${props => props.theme.colors.gray800};
	padding-bottom: 12px;
	margin: 0;
	font-size: 16px;
	line-height: 24px;
	font-weight: 600;
`
