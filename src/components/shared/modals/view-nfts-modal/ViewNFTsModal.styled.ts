import styled from '@emotion/styled'
import { Box, Flex } from 'theme-ui'

export const ModalContent = styled(Flex)`
	flex-direction: column;
	width: 100%;
	height: 100%;
	max-width: 1272px;
`

export const ModalContentHeader = styled(Flex)`
	justify-content: space-between;
	align-items: center;
`

export const ModalOverlay = styled(Flex)`
	display: flex;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.7);
	flex-direction: column;
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
		pl: ['20px', '32px', '112px'],
		pr: ['10px', '22px', '112px'],
		py: ['20px', '24px', '32px'],

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
		bg: 'green',
		maxWidth: '206px',
	},
}

export const SearchContainer = styled(Flex)``

SearchContainer.defaultProps = {
	sx: { flex: 1 },
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
		p: '14px',
	},
}

export const NFTCardsGrid = styled(Flex)``

NFTCardsGrid.defaultProps = {
	sx: {
		display: 'grid',
		gridTemplateColumns: [
			'repeat(auto-fill, minmax(200px, 1fr))',
			'repeat(auto-fill, minmax(240px, 1fr))',
			'repeat(auto-fill, minmax(240px, 1fr))',
		],
		gridColumnGap: ['8px', '16px', '32px'],
		gridRowGap: ['8px', '16px', '32px'],
		width: '100%',
	},
}

export const FiltersSection = styled(Flex)`
	flex-direction: column;
	overflow: auto;
`

FiltersSection.defaultProps = {
	sx: {
		minWidth: '280px',
		display: ['none', 'none', 'flex'],
		gap: '8px',
	},
}
