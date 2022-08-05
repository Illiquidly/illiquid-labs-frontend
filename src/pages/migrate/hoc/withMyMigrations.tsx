import React from 'react'
import { useWallet } from '@illiquid-labs/use-wallet'
import { TxReceipt } from 'services/blockchain/blockchain.interface'
import useTransactionError from 'hooks/useTransactionError'
import { toast } from 'react-toastify'
import { noop } from 'lodash'
import { useRecoilState } from 'recoil'
import useBroadcastingTx from 'hooks/useBroadcastingTx'
import pMap from 'p-map'
import { useQuery } from '@tanstack/react-query'
import { asyncAction } from 'utils/js/asyncAction'
import { appLoadingState } from 'state'
import { MigratableCollectionsService } from 'services/api/migratableCollectionsService'
import { MigratorService } from 'services/api/migratorService'
import cw721Migrator from 'services/blockchain/contracts/cw721Migrator'
import { Box } from 'rebass'
import { useRouter } from 'next/router'
import { ToastLink } from '../index.styled'
import { MigrationSectionProps } from '../components/MigrationSection/MigrationSection'
import useMyMigrations, { Migration } from '../hooks/useMyMigrations'

const renderToastContent = ({ url }: { url?: string }) => (
	<div>
		<Box marginRight={4}>Your NFTs were successfully locked.</Box>
		<ToastLink href={url} target='_blank' rel='noreferrer'>
			Open in Terra Finder
		</ToastLink>
	</div>
)

export function withMyMigrations(
	WrappedComponent: React.ComponentType<MigrationSectionProps>
) {
	function ComponentWithMigrationsHook(
		props: Omit<
			MigrationSectionProps,
			'loading' | 'migrations' | 'fetchMigrations'
		>
	) {
		const [, setAppLoading] = useRecoilState(appLoadingState)

		const wallet = useWallet()

		const { query } = useRouter()

		const myAddress = (query.address as string) || wallet.wallets[0]?.terraAddress

		const { data: migratableCollections } = useQuery(
			['migratableCollections'],
			async () => MigratableCollectionsService.getMigratableCollections()
		)

		const [showTransactionError] = useTransactionError()
		const [txReceipt, setTxReceipt] = React.useState<TxReceipt | null>(null)

		const {
			myMigrations,
			loading: myMigrationsLoading,
			fetchMigrations,
		} = useMyMigrations()

		const onSuccessBroadcast = async () => {
			toast.success(renderToastContent({ url: txReceipt?.txTerraFinderUrl }), {
				position: 'top-right',
				autoClose: false,
				onClick: noop,
				hideProgressBar: true,
				closeOnClick: true,
				pauseOnHover: false,
				draggable: false,
				progress: undefined,
				pauseOnFocusLoss: false,
			})

			await fetchMigrations()

			setAppLoading(false)
		}

		const { setLoading, loading } = useBroadcastingTx(
			txReceipt?.txId,
			onSuccessBroadcast
		)

		const onSubmit = async (pendingMigrations: Migration[]) => {
			setAppLoading(true)
			setLoading({ ...loading, send: true })

			const apiClaimRequest = await pMap(
				pendingMigrations,
				async (migration: Migration) => ({
					contractAddress: (migratableCollections ?? {})[migration?.contractAddress]
						.minterContract,
					...(await MigratorService.getClaimRequest(myAddress, migration)),
				})
			)

			const [error, txResponse] = await asyncAction(
				cw721Migrator.claimManyNFTs(apiClaimRequest)
			)

			if (txResponse) {
				setTxReceipt(txResponse)
			}
			if (error) {
				showTransactionError(error)
				setAppLoading(false)
			}
			setLoading({ ...loading, send: false })
		}

		return (
			<WrappedComponent
				{...props}
				loading={myMigrationsLoading}
				migrations={myMigrations}
				isClaimable
				hasCount
				onSubmit={onSubmit}
			/>
		)
	}

	return ComponentWithMigrationsHook
}
