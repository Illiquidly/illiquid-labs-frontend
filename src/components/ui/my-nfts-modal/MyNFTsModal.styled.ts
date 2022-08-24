import styled from '@emotion/styled'
import { Flex } from 'theme-ui'

export const NFTSelectionOverlay = styled(Flex)``

NFTSelectionOverlay.defaultProps = {
	sx: {
		zIndex: 9,
		position: 'absolute',
		bottom: 0,
		left: ['47px', '128px'],
		right: ['47px', '128px'],
		height: ['160px'],
		display: 'flex',
	},
}

export const NFTCardContainer = styled(Flex)``

NFTCardContainer.defaultProps = {
	sx: {
		flex: 1,
		overflow: 'scroll',
		gap: '16px',
		flexDirection: 'column',
	},
}

export const MyNFTsBody = styled(Flex)``

MyNFTsBody.defaultProps = {
	sx: {
		flex: 1,
		mt: ['12px'],
		mx: '8px',
		overflow: 'hidden',
	},
}

export const ModalBody = styled(Flex)``
ModalBody.defaultProps = {
	sx: {
		flexDirection: 'column',
		flex: 1,
		position: 'relative',
		overflow: 'scroll',
	},
	mt: ['16px', '32px'],
}
