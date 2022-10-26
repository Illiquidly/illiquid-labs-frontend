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

import { Box, Flex } from 'theme-ui'

import { Raffle } from 'services/api/rafflesService'
import { ConfettiIcon } from 'assets/icons/mixed'

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
	const { t } = useTranslation(['common', 'raffle-listings'])
	const columns: Array<string> = t(
		'raffle-listings:participants.table.columns',
		{
			returnObjects: true,
		}
	)

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
										}}
									/>
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
}

export default RaffleParticipantsTable
