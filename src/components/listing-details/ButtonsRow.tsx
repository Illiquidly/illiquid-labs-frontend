import React from 'react'
import { useTranslation } from 'next-i18next'

import { Button } from 'components/ui'
import { Flex } from 'theme-ui'

import { IconButton } from 'components/listing-details'
import * as ROUTES from 'constants/routes'
import {
	DeleteOutlineIcon,
	PenOutlineIcon,
	ShareOutlineIcon,
	ArrowLeftIcon,
} from 'assets/icons/mixed'

export const ButtonsRow = ({ handleEditClick, handleRemoveClick }) => {
	const { t } = useTranslation(['common', 'trade-listings'])

	return (
		<>
			<Flex
				sx={{
					justifyContent: 'flex-start',
				}}
			>
				<Button
					href={ROUTES.TRADE}
					sx={{ height: '40px', padding: '13px' }}
					variant='secondary'
					startIcon={<ArrowLeftIcon />}
				>
					{t('trade-listings:back-to-listings')}
				</Button>
			</Flex>
			<Flex
				sx={{
					gap: '6px',
					justifyContent: 'flex-end',
				}}
			>
				<IconButton onClick={handleEditClick}>
					<PenOutlineIcon />
				</IconButton>
				<IconButton onClick={handleRemoveClick}>
					<DeleteOutlineIcon />
				</IconButton>
				<IconButton>
					<ShareOutlineIcon />
				</IconButton>
			</Flex>
		</>
	)
}

export default ButtonsRow
