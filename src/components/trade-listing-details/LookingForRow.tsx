import React from 'react'

import { Tooltip } from 'components/ui'
import { Flex } from 'theme-ui'

import {
	Chip,
	LookingForSection,
	LookingForTitle,
} from 'components/trade-listing-details'
import { useTranslation } from 'next-i18next'
import { LookingFor } from 'types'

export interface LookingForProps {
	lookingFor: LookingFor[]
	lookingForItemsLimit?: number
}

export const LookingForRow = ({
	lookingFor,
	lookingForItemsLimit = 3,
}: LookingForProps) => {
	const { t } = useTranslation(['common'])
	return (
		<LookingForSection>
			<LookingForTitle>{t('common:looking-for')}</LookingForTitle>
			<Flex sx={{ flexWrap: 'wrap', gap: '4.3px' }}>
				{!lookingFor.length && <Chip>{t('common:any-offer')}</Chip>}
				{(lookingFor ?? []).map((value, index) =>
					index < lookingForItemsLimit ? (
						<Chip key={JSON.stringify(value)}>
							{value.currency
								? `${value.amount} ${value.currency}`
								: value.collectionName}
						</Chip>
					) : null
				)}
				{Boolean(lookingFor?.slice(lookingForItemsLimit).length) && (
					<Tooltip
						overlay={
							<div>
								{lookingFor?.slice(lookingForItemsLimit).map(value => (
									<div key={JSON.stringify(value)}>
										{value.currency
											? `${value.amount} ${value.currency}`
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

export default LookingForRow
