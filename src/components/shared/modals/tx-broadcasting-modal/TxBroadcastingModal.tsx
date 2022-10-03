import React from 'react'
import { Box, Flex, IconButton } from 'theme-ui'
import { useTranslation } from 'next-i18next'

import NiceModal, { useModal } from '@ebay/nice-modal-react'
import { useTheme } from '@emotion/react'

import { ModalCloseIcon } from 'assets/icons/modal'

import { Modal } from 'components/ui'

import parseTxError from 'utils/blockchain/parseTxError'
import { useBroadcastingTx } from 'hooks'
import { noop } from 'lodash'
import { TxReceipt } from 'services/blockchain/blockchain.interface'
import { asyncAction } from 'utils/js/asyncAction'
import { LayoutContainer } from 'components/layout'
import {
	ModalBody,
	ModalContainer,
	ModalHeader,
	ModalContent,
	Title,
	Subtitle,
} from './TxBroadcastingModal.styled'

export interface TxBroadcastingModalProps {
	transactionAction: Promise<TxReceipt>
}

const TxBroadcastingModal = NiceModal.create(
	({ transactionAction }: TxBroadcastingModalProps) => {
		const modal = useModal()

		const { t } = useTranslation(['common'])
		const [txReceipt, setTxReceipt] = React.useState<TxReceipt | null>(null)
		const [error, setError] = React.useState('')

		const [data, setData] = React.useState<unknown>(null)

		const theme = useTheme()
		const parsedError = error ? parseTxError(error) : ''

		const onSuccessBroadcast = async (responseData: unknown) => {
			setData(responseData)
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
				setError(parseTxError(txError))
			}
			setLoading({ ...loading, send: false })
		}

		React.useEffect(() => {
			executeBlockchain()
		}, [])

		const closeModal = () => {
			modal.resolve(data)
			modal.remove()
		}

		return (
			<Modal
				isOverHeader
				isOpen={modal.visible}
				onCloseModal={error || !loading.broadcasting ? closeModal : noop}
			>
				<ModalContainer>
					<LayoutContainer>
						<ModalContent>
							<ModalHeader>
								{t('common:tx-broadcasting.title')}
								<IconButton
									sx={{
										borderRadius: '32px',
										backgroundColor: theme.colors.dark500,
									}}
									disabled={loading.broadcasting || loading.send}
									onClick={closeModal}
								>
									<ModalCloseIcon />
								</IconButton>
							</ModalHeader>
							<ModalBody>
								<Flex sx={{ gap: '8px' }}>
									<Box>
										{/* TODO: implement */}
										{loading.broadcasting && <div>Broadcasting</div>}
										{loading.send && <div>Sending</div>}
										{error && <div>Errored: {parsedError}</div>}

										<Title>{t('common:tx-broadcasting.success-title')}</Title>
										<Subtitle>{t('common:tx-broadcasting.success-subtitle')}</Subtitle>
									</Box>
								</Flex>
							</ModalBody>
						</ModalContent>
					</LayoutContainer>
				</ModalContainer>
			</Modal>
		)
	}
)
export default TxBroadcastingModal
