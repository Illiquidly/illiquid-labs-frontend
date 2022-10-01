import React from 'react'

import { Tooltip } from 'components/ui'
import { Flex } from 'theme-ui'

import {
	Chip,
	LookingForSection,
	LookingForTitle,
} from 'components/listing-details'
import { useTranslation } from 'next-i18next'

export const LookingForRow = ({ lookingFor, lookingForItemsLimit = 3 }) => {
	const { t } = useTranslation(['common'])
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
								{lookingFor?.slice(lookingForItemsLimit).map(item => (
									<div key={JSON.stringify(item)}>
										{item.collectionName || `${item.amount} ${item.denom}`}
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