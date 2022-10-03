import styled from '@emotion/styled'
import { Box, Flex } from 'theme-ui'

export const ModalContent = styled(Flex)`
	flex-direction: column;
	flex: 1;
	max-width: 1272px;
`

export const ModalContentHeader = styled(Flex)`
	justify-content: space-between;
	align-items: center;
`

export const ModalOverlay = styled(Flex)`
	position: absolute;
	inset: 0;
	flex: 1;
	flex-direction: column;
	background: rgba(0, 0, 0, 0.7);
`

export const ModalHeader = styled(Flex)``

ModalHeader.defaultProps = {
	sx: {
		display: ['none', 'none', 'flex'],
		height: '72px',
		p: '24px 16px',
		justifyContent: 'center',
		alignItems: 'center',
	},
}

export const ModalBody = styled(Flex)``

ModalBody.defaultProps = {
	sx: {
		bg: 'dark100',
		flex: 1,
		p: ['20px', '24px 32px', '32px 112px'],
		borderRadius: [0, 0, '16px 16px 0px 0px'],
		overflow: 'hidden',
		justifyContent: 'center',
	},
}

export const ModalTitle = styled(Box)`
	font-family: 'Inter';
	font-style: normal;
	font-weight: 700;
`

ModalTitle.defaultProps = {
	sx: {
		fontSize: ['26px', '26px', '34px'],
		lineHeight: ['36px', '36px', '48px'],
	},
}

export const SortSelectContainer = styled(Flex)``

SortSelectContainer.defaultProps = {
	sx: {
		display: ['none', 'none', 'flex'],
		flex: 1,
		maxWidth: '206px',
	},
}

export const SearchContainer = styled(Flex)``

SearchContainer.defaultProps = {
	sx: { flex: 1 },
}

export const MyNFTsBody = styled(Flex)``

MyNFTsBody.defaultProps = {
	sx: {
		mt: ['16px', '32px', '36px'],
		gap: '34px',
		overflow: 'auto',
	},
}

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
		zIndex: 'modalNFTCard',
		p: '14px',
	},
}

export const NFTCardContainer = styled(Flex)``

NFTCardContainer.defaultProps = {
	sx: {
		display: 'grid',
		gridTemplateColumns: [
			'repeat(auto-fill, minmax(200px, 1fr))',
			'repeat(auto-fill, minmax(240px, 1fr))',
			'repeat(auto-fill, minmax(240px, 1fr))',
		],
		gridColumnGap: ['8px', '16px', '32px'],
		gridRowGap: ['8px', '16px', '32px'],
		width: ['initial', 'initial', '100%'],
	},
}

export const NFTCardsGridWrapper = styled(Flex)``
NFTCardsGridWrapper.defaultProps = {
	sx: {
		width: '100%',
		flexDirection: ['column', 'column', 'row'],
		position: 'relative',
		overflow: 'auto',
	},
}

export const CollectionFiltersSection = styled(Box)`
	flex-direction: column;
	overflow: auto;
`

CollectionFiltersSection.defaultProps = {
	sx: {
		minWidth: '280px',
		display: ['none', 'none', 'flex'],
		gap: '8px',
	},
}
