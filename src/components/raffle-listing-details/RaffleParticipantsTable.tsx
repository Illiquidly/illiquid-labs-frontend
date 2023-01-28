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
import { AvatarIcon, ConfettiIcon } from 'assets/icons/mixed'
import moment from 'moment'
import { firstBy } from 'thenby'
import useAddress from 'hooks/useAddress'
import useNameService from 'hooks/useNameService'
import { fromIPFSImageURLtoImageURL } from 'utils/blockchain/ipfs'
import { ImagePlaceholder, NameLabel, NameServiceImage } from './styled'

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

	const participants = (raffle?.participants ?? [])
		.map(raffleParticipant => ({
			isWinner: raffleParticipant?.user === raffle?.raffleInfo?.winner,
			...raffleParticipant,
		}))
		.sort(
			firstBy('isWinner', 'desc')
				.thenBy((a: RaffleParticipant) => (a.user === myAddress ? -1 : 1))
				.thenBy('ticketNumber', 'desc')
		)

	const nameServiceResolutions = useNameService(participants.map(p => p.user))

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
					{participants.map((raffleParticipant, index) => {
						const name = nameServiceResolutions[index]?.extension?.name ?? ''
						const profileImage = nameServiceResolutions[index]?.extension?.image ?? ''

						return (
							<TableBodyRow key={raffleParticipant.id}>
								<TableBodyRowCell style={{ verticalAlign: 'top' }}>
									<Flex sx={{ gap: '12px' }}>
										<ImagePlaceholder>
											{profileImage ? (
												<NameServiceImage src={fromIPFSImageURLtoImageURL(profileImage)} />
											) : (
												<AvatarIcon width='100%' height='100%' />
											)}
										</ImagePlaceholder>
										<div>
											<OverflowTip>
												<NameLabel>{name}</NameLabel>
											</OverflowTip>
											<OverflowTip>
												<div>{raffleParticipant?.user ?? ''}</div>
											</OverflowTip>
										</div>
									</Flex>
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
										{moment(raffleParticipant?.updatedAt).fromNow()}
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
										{raffleParticipant.isWinner && (
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
