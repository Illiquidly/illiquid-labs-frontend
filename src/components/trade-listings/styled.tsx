import styled from '@emotion/styled'
import { Button } from 'components'
import { Flex } from 'theme-ui'

export const TabsSection = styled(Flex)``

TabsSection.defaultProps = {
	sx: {
		mt: ['12px', '24px', '16px'],
		display: ['flex', 'flex', 'flex'],
		maxWidth: [null, null, '230px'],
	},
}

export const FiltersSection = styled(Flex)``

FiltersSection.defaultProps = {
	sx: { mt: ['12px', '20px', '12px'], gap: '12px', minHeight: '48px' },
}

export const SearchInputContainer = styled(Flex)``

SearchInputContainer.defaultProps = {
	sx: { flex: 1, order: [1, 1, 2] },
}

export const FiltersButtonContainer = styled(Flex)``

FiltersButtonContainer.defaultProps = {
	sx: {
		order: [2, 2, 1],
	},
}

export const GridSwitchContainer = styled(Flex)``

GridSwitchContainer.defaultProps = {
	sx: { display: ['none', 'none', 'flex'], order: 4 },
}

export const FiltersButtonLabel = styled(Flex)``

FiltersButtonLabel.defaultProps = {
	as: 'span',
	sx: {
		display: ['none', 'none', 'block'],
	},
}

export const SortSelectContainer = styled(Flex)``

SortSelectContainer.defaultProps = {
	sx: {
		display: ['none', 'none', 'flex'],
		order: 3,
		width: '191px',
		bg: 'green',
	},
}

export const ListingsNFTsContainer = styled(Flex)`
	gap: 16px;
`

ListingsNFTsContainer.defaultProps = {
	sx: { mt: ['12px', '32px'], mb: ['128px'] },
}

export const DesktopFiltersSection = styled(Flex)``

DesktopFiltersSection.defaultProps = {
	sx: {
		display: ['none', 'none', 'flex'],
		minWidth: '308px',
		flexDirection: 'column',
		flex: 1,
	},
}

export const FilterButton = ({ children, ...props }) => (
	<Button {...props}>{children}</Button>
)

FilterButton.defaultProps = {
	sx: {
		alignItems: 'center',
		justifyContent: 'center',
		gap: '12px',
	},
	variant: 'secondary',
	fullWidth: true,
}

export const AccordionContentWrapper = styled.div`
	flex: 1;
	margin-bottom: 8px;
`
