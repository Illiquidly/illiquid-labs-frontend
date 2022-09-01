import styled from '@emotion/styled'
import { Box, Flex } from 'theme-ui'

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
			'repeat(auto-fill, minmax(332px, 1fr))',
			'repeat(auto-fill, minmax(280px, 1fr))',
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

export const CollectionFiltersSection = styled(Box)``

CollectionFiltersSection.defaultProps = {
	sx: {
		width: '280px',
		display: ['none', 'none', 'flex'],
		bg: 'green',
	},
}

export const ModalBody = styled(Flex)``

ModalBody.defaultProps = {
	sx: {
		mt: ['16px', '32px', '36px'],
		gap: '34px',
		overflow: 'auto',
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
	sx: { flex: 1, bg: 'yellow' },
}
