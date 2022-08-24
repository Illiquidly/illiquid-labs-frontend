import { noop } from 'lodash'
import React from 'react'
import { Box } from 'theme-ui'
import {
	DescriptionSection,
	ImageSection,
	Subtitle,
	Title,
} from './NFTCard.styled'

interface NFTCardProps {
	// checked?: boolean
	// verified?: boolean
	onClick?: React.MouseEventHandler<HTMLDivElement>
	title?: string
	subtitle?: string
}

function NFTCard({
	// checked,
	// verified,
	onClick,
	title,
	subtitle,
}: NFTCardProps) {
	return (
		<Box onClick={onClick}>
			<ImageSection />
			<DescriptionSection>
				<Title>{title}</Title>
				<Subtitle>{subtitle}</Subtitle>
			</DescriptionSection>
		</Box>
	)
}

NFTCard.defaultProps = {
	// checked: false,
	// verified: false,
	onClick: noop,
	title: '',
	subtitle: '',
}

export default NFTCard
