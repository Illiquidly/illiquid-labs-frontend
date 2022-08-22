import { useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import { ModalCloseIcon } from 'assets/icons/modal'
import React from 'react'
import { Box, IconButton } from 'theme-ui'
import { Img } from 'react-image'

const Container = styled.div`
	display: flex;
	flex: 1;

	gap: 2px 2px;
	background: ${props => props.theme.colors.dark500};
	box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.25);
	border-radius: 8px;
	overflow: hidden;
`

const Grid = styled.div`
	padding: 12px;
	flex: 1;
	display: grid;
	grid-template-columns: repeat(auto-fill, 60px);
	grid-template-rows: repeat(auto-fill, 60px);
	grid-column-gap: 8px;
	grid-row-gap: 8px;
	overflow: auto;
`

const StyledBox = styled(Box)`
	background: #15203e;

	border: 2px solid ${props => props.theme.colors.success100};
	border-radius: 6px;
`

type SelectCardItem = {
	id: number | string
	imageUrl: string
}

interface SelectCardProps {
	items: SelectCardItem[]
	onRemove: (id: string | number) => void
}

function SelectCard({ items, onRemove }: SelectCardProps) {
	const theme = useTheme()

	return (
		<Container>
			<Grid>
				{items.map(({ id, imageUrl }) => (
					<StyledBox
						key={id}
						sx={{
							height: '60px',
							width: '60px',
							position: 'relative',
							overflow: 'hidden',
						}}
					>
						<Box
							sx={{
								position: 'absolute',
								zIndex: theme.zIndices.imgOverlay,
								inset: 0,
								display: 'flex',
								justifyContent: 'flex-end',
							}}
						>
							<IconButton onClick={() => onRemove(id)}>
								<ModalCloseIcon
									fill={theme.colors.dark500}
									width='24px'
									height='24px'
								/>
							</IconButton>
						</Box>
						<Img width='100%' height='100%' src={imageUrl} />
					</StyledBox>
				))}
			</Grid>
		</Container>
	)
}

export default SelectCard
