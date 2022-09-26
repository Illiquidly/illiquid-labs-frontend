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
	flexGrowItems?: boolean
}

export const Chip = ({
	children,
	onClick,
	isViewMode,
	flexGrowItems,
}: Props) => {
	return (
		<StyledChip isViewMode={isViewMode} flexGrowItems={flexGrowItems}>
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
	flexGrowItems: false,
}
