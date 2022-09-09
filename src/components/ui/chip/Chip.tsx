import { CloseIcon } from 'assets/icons/action'
import React from 'react'
import { ChipText, CloseIconButton, StyledChip } from './Chip.styled'

interface Props {
	children: React.ReactNode
	onClick?: () => void
}

export const Chip = ({ children, onClick }: Props) => {
	return (
		<StyledChip>
			<ChipText>{children}</ChipText>
			{onClick && (
				<CloseIconButton onClick={onClick}>
					<CloseIcon />
				</CloseIconButton>
			)}
		</StyledChip>
	)
}

Chip.defaultProps = {
	onClick: undefined,
}
