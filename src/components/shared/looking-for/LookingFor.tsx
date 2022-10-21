import Tooltip from 'rc-tooltip'
import { Box, Flex } from 'theme-ui'
import { useTranslation } from 'next-i18next'

import { Collection } from 'services/api/walletNFTsService'
import { LunaIcon } from 'assets/icons/mixed'
import {
	LookingForSection,
	LookingForTitle,
	Chip,
} from '../trade/listing-card/ListingCard.styled'

export interface LookingForProps {
	lookingFor: (Partial<Collection> & {
		currency?: string
		amount?: string
	})[]
	lookingForItemsLimit?: number
	hasLookingFor?: boolean
	primary?: boolean
	secondary?: boolean
}

export default function LookingFor({
	lookingFor = [],
	lookingForItemsLimit = 4,
	hasLookingFor = true,
	primary = true,
	secondary = false,
}: LookingForProps) {
	const { t } = useTranslation('common')
	return (
		<LookingForSection sx={{ display: hasLookingFor ? 'flex' : 'none' }}>
			<LookingForTitle>{t('common:looking-for')}</LookingForTitle>
			<Flex sx={{ flexWrap: 'wrap', gap: '4.3px' }}>
				{!lookingFor?.length ? (
					<Chip primary={primary} secondary={secondary}>
						{t('common:any-offer')}
					</Chip>
				) : null}
				{(lookingFor || []).map((value, index) =>
					index < lookingForItemsLimit ? (
						<Chip primary={primary} secondary={secondary} key={JSON.stringify(value)}>
							{value.currency && (
								<Flex sx={{ mr: '5px', alignItems: 'center' }}>
									<LunaIcon
										width={primary ? '16.2px' : '20px'}
										height={primary ? '16.2px' : '20px'}
									/>
								</Flex>
							)}
							<Box>
								{value.amount
									? `${value.amount} ${value.currency}`
									: value.collectionName}
							</Box>
						</Chip>
					) : null
				)}
				{lookingFor?.slice(lookingForItemsLimit).length ? (
					<Tooltip
						overlay={
							<div>
								{lookingFor?.slice(lookingForItemsLimit).map(value => (
									<div key={JSON.stringify(value)}>
										{value.amount
											? `${value.amount} ${value.currency}`
											: value.collectionName}
									</div>
								))}
							</div>
						}
					>
						<Chip primary={primary} secondary={secondary}>
							+{lookingFor?.slice(lookingForItemsLimit).length}
						</Chip>
					</Tooltip>
				) : null}
			</Flex>
		</LookingForSection>
	)
}

LookingFor.defaultProps = {
	lookingFor: [],
	lookingForItemsLimit: 4,
	variant: 'primary',
}
