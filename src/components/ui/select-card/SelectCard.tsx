import { useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import { ModalCloseIcon } from 'assets/icons/modal'
import { Img } from 'react-image'
import { NFT } from 'services/api/walletNFTsService'
import { Box, Flex, IconButton, ThemeUIStyleObject } from 'theme-ui'

const Container = styled(Flex)`
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

interface SelectCardProps {
	items: NFT[]
	onRemove: (NFT: NFT) => void
	sx?: ThemeUIStyleObject
}

function SelectCard({ items, onRemove, sx }: SelectCardProps) {
	const theme = useTheme()

	return (
		<Container sx={sx}>
			<Grid>
				{items.map(nft => {
					const { collectionAddress, tokenId, imageUrl } = nft

					return (
						<StyledBox
							key={`${collectionAddress}_${tokenId}`}
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
									inset: 0,
									display: 'flex',
									justifyContent: 'flex-end',
								}}
							>
								<IconButton onClick={() => onRemove(nft)}>
									<ModalCloseIcon
										fill={theme.colors.dark500}
										width='24px'
										height='24px'
									/>
								</IconButton>
							</Box>
							<Img width='100%' height='100%' src={imageUrl} />
						</StyledBox>
					)
				})}
			</Grid>
		</Container>
	)
}

SelectCard.defaultProps = {
	sx: {},
}

export default SelectCard
