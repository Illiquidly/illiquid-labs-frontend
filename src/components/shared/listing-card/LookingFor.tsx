import Tooltip from 'rc-tooltip'
import { Flex } from 'theme-ui'
import { useTranslation } from 'next-i18next'

import { Collection } from 'services/api/walletNFTsService'
import { LookingForSection, LookingForTitle, Chip } from './ListingCard.styled'

export interface LookingForProps {
	lookingFor?: (Partial<Collection> & {
		denom?: string
		amount?: string
	})[]
	lookingForItemsLimit?: number
}

export default function LookingFor({
	lookingFor = [],
	lookingForItemsLimit = 4,
}: LookingForProps) {
	const { t } = useTranslation('common')
	return (
		<LookingForSection>
			<LookingForTitle>{t('common:looking-for')}</LookingForTitle>
			<Flex sx={{ flexWrap: 'wrap', gap: '4.3px' }}>
				{lookingFor.map((value, index) =>
					index < lookingForItemsLimit ? (
						<Chip key={JSON.stringify(value)}>
							{value.denom ? `${value.amount} ${value.denom}` : value.collectionName}{' '}
						</Chip>
					) : null
				)}
				{lookingFor?.slice(lookingForItemsLimit).length && (
					<Tooltip
						overlay={
							<div>
								{lookingFor?.slice(lookingForItemsLimit).map(value => (
									<div key={JSON.stringify(value)}>
										{value.denom
											? `${value.amount} ${value.denom}`
											: value.collectionName}
									</div>
								))}
							</div>
						}
					>
						<Chip>+{lookingFor?.slice(lookingForItemsLimit).length}</Chip>
					</Tooltip>
				)}
			</Flex>
		</LookingForSection>
	)
}

LookingFor.defaultProps = {
	lookingFor: [],
	lookingForItemsLimit: 4,
}
