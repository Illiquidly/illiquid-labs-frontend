import { ReactNode } from 'react'
import { BigChipText, StyledChip, VisibilityChipWrapper } from './Chip.styled'

interface Props {
	icon?: ReactNode
	leftText: string
	rightText: string
	isViewMode?: boolean
}

export const VisibilityChip = ({
	icon,
	leftText,
	rightText,
	isViewMode,
}: Props) => {
	return (
		<VisibilityChipWrapper>
			<StyledChip isViewMode={isViewMode}>
				<BigChipText>
					{icon}
					{leftText}
				</BigChipText>
			</StyledChip>

			<StyledChip isViewMode={isViewMode}>
				<BigChipText>{rightText}</BigChipText>
			</StyledChip>
		</VisibilityChipWrapper>
	)
}

VisibilityChip.defaultProps = {
	icon: undefined,
	isViewMode: true,
}
