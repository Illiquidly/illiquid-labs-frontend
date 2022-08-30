import styled from '@emotion/styled'
import { Flex } from 'theme-ui'

export const NFTSelectionOverlay = styled(Flex)``

NFTSelectionOverlay.defaultProps = {
	sx: {
		position: 'absolute',
		bottom: 0,
		justifyContent: 'center',
		left: ['47px', '128px'],
		right: ['47px', '128px'],
		height: ['160px'],
		display: 'flex',
		zIndex: 9999,
		p: '14px',
	},
}

export const NFTCardContainer = styled(Flex)``

NFTCardContainer.defaultProps = {
	sx: {
		display: 'grid',
		gridTemplateColumns: [
			'repeat(auto-fill, minmax(200px, 1fr))',
			'repeat(auto-fill, minmax(332px, 1fr))',
			'repeat(auto-fill, minmax(332px, 1fr))',
		],
		gridColumnGap: ['8px', '16px', '32px'],
		gridRowGap: ['8px', '16px', '32px'],
		mt: ['12px', '12px', '0px'],
		mx: ['8px', '8px', '0px'],
		width: ['initial', 'initial', '100%'],
	},
}

export const ModalBody = styled(Flex)``
ModalBody.defaultProps = {
	sx: {
		flexDirection: 'column',
		position: 'relative',
		padding: ['8px', '8px', '0'],
		overflow: 'auto',
	},
	mt: ['16px', '32px'],
}
