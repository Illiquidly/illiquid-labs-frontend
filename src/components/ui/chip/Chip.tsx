import { CloseIcon } from 'assets/icons/action'
import React from 'react'
import {
	BigChipText,
	ChipText,
	CloseIconButton,
	StyledChip,
} from './Chip.styled'

interface Props {
	children: React.ReactNode
	onClick?: () => void
	isViewMode?: boolean
}

export const Chip = ({ children, onClick, isViewMode }: Props) => {
	return (
		<StyledChip>
			{isViewMode ? (
				<BigChipText>{children}</BigChipText>
			) : (
				<ChipText>{children}</ChipText>
			)}
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
	isViewMode: false,
}
