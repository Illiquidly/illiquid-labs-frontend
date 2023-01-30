import styled from '@emotion/styled'
import { Flex, Text } from 'theme-ui'

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
		minHeight: [null, null, null, '393px'],
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
	sx: {
		flexDirection: ['column', 'row'],
		width: ['100%', 'auto'],
	},
}

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
