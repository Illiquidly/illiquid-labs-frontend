import React from 'react'
import { Flex, IconButton } from 'theme-ui'
import { useTranslation } from 'next-i18next'

import NiceModal, { useModal } from '@ebay/nice-modal-react'

import {
	ModalCloseIcon,
	ModalErrorCircleIcon,
	ModalSuccessCircleIcon,
} from 'assets/icons/modal'
import { noop } from 'lodash'

import { Button, Loader, Modal } from 'components/ui'

import parseTxError from 'utils/blockchain/parseTxError'
import { useBroadcastingTx } from 'hooks'
import { TxReceipt } from 'services/blockchain/blockchain.interface'
import { asyncAction } from 'utils/js/asyncAction'
import getShortText from 'utils/js/getShortText'
import { AxiosError } from 'axios'
import {
	ModalContainer,
	ModalContent,
	Title,
	Subtitle,
	TxHashText,
	TxHashContainer,
	HeaderErrorIconContainer,
	HeaderSuccessIconContainer,
	DividerLine,
	CompleteSectionTitle,
	CompleteSectionTxHash,
	CompleteSectionSubtitle,
} from './TxBroadcastingModal.styled'

export interface TxBroadcastingModalProps {
	transactionAction: Promise<TxReceipt>
	closeOnFinish?: boolean
}

interface TxBroadcastingErrorProps {
	errorMessage: string
	onTryAgain: () => void
	onClose: () => void
}

const TxBroadcastingError = ({
	errorMessage,
	onTryAgain,
	onClose,
}: TxBroadcastingErrorProps) => {
	const { t } = useTranslation(['common'])
	return (
		<Flex sx={{ flexDirection: 'column' }}>
			<Flex sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
				<HeaderErrorIconContainer>
					<ModalErrorCircleIcon width='19.2px' height='19.2px' />
				</HeaderErrorIconContainer>
				<IconButton
					sx={{
						borderRadius: '100%',
						background: 'dark500',
					}}
					onClick={onClose}
				>
					<ModalCloseIcon />
				</IconButton>
			</Flex>
			<Flex sx={{ mt: '8px' }}>
				<Title>{t('common:failed')}</Title>
			</Flex>
			<Flex sx={{ mt: '12px' }}>
				<Subtitle>{errorMessage}</Subtitle>
			</Flex>
			<Flex sx={{ mt: '20px' }}>
				<Button fullWidth onClick={onTryAgain}>
					{t('common:try-again')}
				</Button>
			</Flex>
		</Flex>
	)
}

interface TxBroadcastingProcessingProps {
	txHash?: string
	terraFinderUrl?: string
	onClose?: () => void
}

const TxBroadcastingProcessing = ({
	txHash,
	terraFinderUrl,
	onClose,
}: TxBroadcastingProcessingProps) => {
	const { t } = useTranslation(['common'])
	return (
		<Flex sx={{ flexDirection: 'column' }}>
			{!txHash && (
				<Flex sx={{ justifyContent: 'flex-end', alignItems: 'center' }}>
					<IconButton
						sx={{
							borderRadius: '100%',
							background: 'dark500',
						}}
						onClick={onClose}
					>
						<ModalCloseIcon />
					</IconButton>
				</Flex>
			)}
			<Flex sx={{ justifyContent: 'center', marginTop: '48px' }}>
				<Loader size={28} loadingText={t('common:processing')} />
			</Flex>
			{txHash && (
				<Flex sx={{ mt: '12px' }}>
					<TxHashContainer onClick={() => window.open(terraFinderUrl, '_blank')}>
						<TxHashText>{getShortText(txHash, 6)}</TxHashText>
					</TxHashContainer>
				</Flex>
			)}
		</Flex>
	)
}

TxBroadcastingProcessing.defaultProps = {
	txHash: '',
	terraFinderUrl: '',
	onClose: noop,
}

interface TxBroadcastingCompleteProps {
	txHash: string
	fee: string
	terraFinderUrl: string
	onDone: () => void
}

const TxBroadcastingComplete = ({
	onDone,
	txHash,
	terraFinderUrl,
	fee,
}: TxBroadcastingCompleteProps) => {
	const { t } = useTranslation(['common'])
	return (
		<Flex sx={{ flexDirection: 'column' }}>
			<Flex sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
				<HeaderSuccessIconContainer>
					<ModalSuccessCircleIcon width='20px' height='20px' />
				</HeaderSuccessIconContainer>
				<IconButton
					sx={{
						borderRadius: '100%',
						background: 'dark500',
					}}
					onClick={onDone}
				>
					<ModalCloseIcon />
				</IconButton>
			</Flex>
			<Flex sx={{ mt: '8px' }}>
				<Title>{t('common:complete')}</Title>
			</Flex>

			<Flex sx={{ mt: '28px' }}>
				<DividerLine />
			</Flex>

			<Flex sx={{ mt: '8px', justifyContent: 'space-between' }}>
				<CompleteSectionTitle>{t('common:tx-hash')}</CompleteSectionTitle>
				<CompleteSectionTxHash
					onClick={() => window.open(terraFinderUrl, '_blank')}
				>
					{getShortText(txHash, 6)}
				</CompleteSectionTxHash>
			</Flex>

			<Flex sx={{ mt: '8px', justifyContent: 'space-between' }}>
				<CompleteSectionSubtitle>{t('common:fee')}</CompleteSectionSubtitle>
				<CompleteSectionSubtitle>{fee}</CompleteSectionSubtitle>
			</Flex>

			<Flex sx={{ mt: '20px' }}>
				<Button fullWidth onClick={onDone}>
					{t('common:done')}
				</Button>
			</Flex>
		</Flex>
	)
}

const TxBroadcastingModal = NiceModal.create(
	({ transactionAction, closeOnFinish = false }: TxBroadcastingModalProps) => {
		const modal = useModal()

		const [txReceipt, setTxReceipt] = React.useState<TxReceipt | null>(null)
		const [error, setError] = React.useState<string>('')

		const [data, setData] = React.useState<unknown>(null)

		const closeResolveModal = (resolveData?: any) => {
			modal.resolve(resolveData || data)
			modal.remove()
		}

		const onSuccessBroadcast = async (responseData: any) => {
			setData({ ...responseData, ...txReceipt })

			if (closeOnFinish) {
				closeResolveModal({ ...responseData, ...txReceipt })
			}
		}

		const { setLoading, loading } = useBroadcastingTx(
			txReceipt?.txId,
			onSuccessBroadcast
		)

		const executeBlockchain = async () => {
			setLoading({ ...loading, send: true })
			const [txError, txResponse] = await asyncAction<TxReceipt>(transactionAction)

			if (txResponse) {
				setTxReceipt(txResponse)
			}
			if (txError) {
				setError(parseTxError(txError as AxiosError<{ message?: string }>))
			}
			setLoading({ ...loading, send: false })
		}

		React.useEffect(() => {
			executeBlockchain()
		}, [])

		return (
			<Modal isOverHeader isOpen={modal.visible} onCloseModal={modal.remove}>
				<ModalContainer>
					<ModalContent>
						{error && !loading.broadcasting && !loading.send && (
							<TxBroadcastingError
								onTryAgain={executeBlockchain}
								errorMessage={error}
								onClose={modal.remove}
							/>
						)}
						{(loading.send || loading.broadcasting) && (
							<TxBroadcastingProcessing
								txHash={txReceipt?.txId}
								terraFinderUrl={txReceipt?.txTerraFinderUrl}
								onClose={modal.remove}
							/>
						)}
						{!loading.send && !loading.broadcasting && !error && txReceipt?.txId && (
							<TxBroadcastingComplete
								txHash={txReceipt?.txId}
								terraFinderUrl={txReceipt.txTerraFinderUrl}
								fee={txReceipt.txFee}
								onDone={closeResolveModal}
							/>
						)}
					</ModalContent>
				</ModalContainer>
			</Modal>
		)
	}
)
export default TxBroadcastingModal
