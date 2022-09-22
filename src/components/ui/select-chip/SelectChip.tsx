import { useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import { ModalCloseIcon } from 'assets/icons/modal'
import { Flex, IconButton, ThemeUIStyleObject } from 'theme-ui'

const Container = styled(Flex)`
	display: flex;
	height: 32px;
	background: ${props => props.theme.colors.dark100};
	border: 1px solid transparent;
	border-radius: 6px;
`

const Text = styled(Flex)`
	font-family: Heebo;
	font-size: 14px;
	line-height: 20px;
	justify-content: center;
	align-items: center;
`

interface SelectChipProps {
	item: string
	onRemove: () => void
	sx?: ThemeUIStyleObject
}

function SelectChip({ item, onRemove, sx }: SelectChipProps) {
	const theme = useTheme()

	return (
		<Container sx={sx}>
			<Flex sx={{ padding: '12px 4px', alignItems: 'center' }}>
				<Text>{item}</Text>
				<IconButton sx={{ alignItems: 'center' }} onClick={() => onRemove()}>
					<ModalCloseIcon fill={theme.colors.dark500} width='20px' height='20px' />
				</IconButton>
			</Flex>
		</Container>
	)
}

SelectChip.defaultProps = {
	sx: {},
}

export default SelectChip
