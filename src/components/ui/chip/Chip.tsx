import { CloseIcon } from 'assets/icons/action'
import { ChipText, CloseIconButton, StyledChip } from './Chip.styled'

interface Props {
	label: string
	onClick: () => void
}

export const Chip = ({ label, onClick }: Props) => {
	return (
		<StyledChip>
			<ChipText>{label}</ChipText>
			<CloseIconButton onClick={onClick}>
				<CloseIcon />
			</CloseIconButton>
		</StyledChip>
	)
}
