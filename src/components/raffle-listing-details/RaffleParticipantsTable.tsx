import styled from '@emotion/styled'

import {
	Table,
	TableHead,
	TableHeadRow,
	TableHeadRowCell,
	TableBody,
	TableBodyRow,
	TableBodyRowCell,
	OverflowTip,
} from 'components/ui'
import { useTranslation } from 'next-i18next'
import React from 'react'

import { Box, Flex } from 'theme-ui'

import { Raffle } from 'services/api/rafflesService'

const Title = styled.div`
	font-style: normal;
	font-weight: 600;
	font-size: 16px;
	line-height: 24px;

	text-align: left;
	color: ${props => props.theme.colors.gray1000};
`

const Container = styled(Flex)`
	flex-direction: column;
	padding-bottom: 45px;
	width: 100%;
`

interface RaffleParticipantsTableProps {
	raffle?: Raffle
}
function RaffleParticipantsTable({ raffle }: RaffleParticipantsTableProps) {
	// const wallet = useWallet()

	const { t } = useTranslation(['common', 'raffle-listings'])
	const columns: Array<string> = t(
		'raffle-listings:participants.table.columns',
		{
			returnObjects: true,
		}
	)

	// const myAddress = useAddress()
	// const isMyRaffle = raffle?.raffleInfo?.owner === myAddress

	return (
		<Container>
			<Box sx={{ padding: '8px 0' }}>
				<Title>{t('raffle-listings:participants.title')}</Title>
			</Box>
			<Table>
				<TableHead>
					<TableHeadRow>
						{(columns || []).map(col => (
							<TableHeadRowCell key={col}>{col}</TableHeadRowCell>
						))}
						<TableHeadRowCell />
					</TableHeadRow>
				</TableHead>
				<TableBody>
					{(raffle?.participants ?? []).map(raffleParticipant => {
						return (
							<TableBodyRow key={raffleParticipant.id}>
								<TableBodyRowCell style={{ verticalAlign: 'top' }}>
									<Flex
										sx={{
											maxWidth: '354px',
											flex: 1,
											flexDirection: 'column',
										}}
									>
										<OverflowTip>
											<div>{raffleParticipant?.owner ?? ''}</div>
										</OverflowTip>
									</Flex>
								</TableBodyRowCell>
								<TableBodyRowCell>
									<Flex
										sx={{
											flex: 1,
											maxWidth: '144px',
											justifyContent: 'flex-start',
										}}
									/>
								</TableBodyRowCell>

								<TableBodyRowCell
									onClick={e => {
										e.stopPropagation()
										e.preventDefault()
									}}
								>
									<Flex
										sx={{
											gap: '12px',
										}}
									/>
								</TableBodyRowCell>
							</TableBodyRow>
						)
					})}
				</TableBody>
			</Table>
		</Container>
	)
}

RaffleParticipantsTable.defaultProps = {
	raffle: undefined,
}

export default RaffleParticipantsTable
