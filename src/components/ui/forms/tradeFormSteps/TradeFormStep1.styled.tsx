import styled from '@emotion/styled'
import { Card } from 'components'

export const ContentCard = styled(Card)`
	border-radius: 12px;
`

ContentCard.defaultProps = {
	sx: {
		p: ['32px 28px', '52px 58px', '32px 28px', '52px 84px'],
		alignItems: 'center',
	},
}
