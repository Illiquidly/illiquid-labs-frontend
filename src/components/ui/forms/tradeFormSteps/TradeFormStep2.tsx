import { useTranslation } from 'next-i18next'
import { ContentCard } from './TradeFormStep2.styled'

export const TradeFormStep2 = () => {
	const { t } = useTranslation(['common', 'trade'])

	return <ContentCard>STEP 2</ContentCard>
}
