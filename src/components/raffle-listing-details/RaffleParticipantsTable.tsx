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
	Button,
} from 'components/ui'
import { useTranslation } from 'next-i18next'
import React from 'react'

import { Flex } from 'theme-ui'

import { Raffle, RaffleParticipant } from 'services/api/rafflesService'
import { ConfettiIcon } from 'assets/icons/mixed'
import moment from 'moment'
import { firstBy } from 'thenby'
import useAddress from 'hooks/useAddress'

const Container = styled(Flex)`
	flex-direction: column;
	padding-bottom: 45px;
	width: 100%;
`
interface RaffleParticipantsTableProps {
	raffle?: Raffle
	excludeTopBorder?: boolean
}
function RaffleParticipantsTable({
	raffle,
	excludeTopBorder,
}: RaffleParticipantsTableProps) {
	const { t } = useTranslation(['common', 'raffle-listings'])
	const columns: Array<string> = t(
		'raffle-listings:participants.table.columns',
		{
			returnObjects: true,
		}
	)

	const myAddress = useAddress()

	const participants = (raffle?.participants ?? []).sort(
		firstBy('winner', 'desc')
			.thenBy((a: RaffleParticipant) => (a.user === myAddress ? -1 : 1))
			.thenBy('ticketNumber', 'desc')
	)

	return (
		<Container>
			<Table
				style={
					excludeTopBorder ? { borderTopRightRadius: 0, borderTopLeftRadius: 0 } : {}
				}
			>
				<TableHead>
					<TableHeadRow>
						{(columns || []).map(col => (
							<TableHeadRowCell key={col}>{col}</TableHeadRowCell>
						))}
						<TableHeadRowCell />
					</TableHeadRow>
				</TableHead>
				<TableBody>
					{participants.map(raffleParticipant => {
						const isWinner = raffleParticipant?.user === raffle?.raffleInfo?.winner

						return (
							<TableBodyRow key={raffleParticipant.id}>
								<TableBodyRowCell style={{ verticalAlign: 'top' }}>
									<OverflowTip>
										<div>{raffleParticipant?.user ?? ''}</div>
									</OverflowTip>
								</TableBodyRowCell>
								<TableBodyRowCell>
									<Flex
										sx={{
											justifyContent: 'flex-start',
										}}
									>
										{raffleParticipant?.ticketNumber ?? ''}
									</Flex>
								</TableBodyRowCell>

								<TableBodyRowCell>
									<Flex
										sx={{
											justifyContent: 'flex-start',
											minWidth: '160px',
										}}
									>
										{moment(raffleParticipant?.updatedAt).toLocaleString()}
									</Flex>
								</TableBodyRowCell>
								<TableBodyRowCell>
									<Flex
										sx={{
											gap: '12px',
											justifyContent: 'flex-end',
											minWidth: '160px',
										}}
									>
										{isWinner && (
											<Button sx={{ pointerEvents: 'none' }} variant='primary'>
												<Flex sx={{ mr: 10 }}>
													<ConfettiIcon />
												</Flex>
												{t('raffle-listings:raffle-winner')}
											</Button>
										)}
									</Flex>
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
	excludeTopBorder: false,
}

export default RaffleParticipantsTable
