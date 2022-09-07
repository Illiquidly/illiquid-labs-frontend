import { useTranslation } from 'next-i18next'
import { Text } from 'theme-ui'
import { ContentCard } from './TradeDetails.styled'

export const TradeDetails = () => {
	const { t } = useTranslation(['common', 'trade'])

	return (
		<ContentCard>
			<Text variant='textXlSemibold'>{t('trade:tradeDetails.question')}</Text>
		</ContentCard>
	)
}
