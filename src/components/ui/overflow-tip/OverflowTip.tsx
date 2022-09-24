import { useIsOverflow } from 'hooks/react/useIsOverflow'
import React, { useRef, ReactElement, JSXElementConstructor } from 'react'
import { Tooltip } from '../tooltip/Tooltip'

function OverflowTip({
	children,
}: {
	children: ReactElement<any, string | JSXElementConstructor<any>>
}) {
	const elementRef = useRef<any>()
	const [isOverflowed] = useIsOverflow(elementRef)

	return (
		<Tooltip
			placement='top'
			overlay={React.cloneElement(children, { style: { color: '#000' } })}
			{...(!isOverflowed ? { visible: false } : {})}
		>
			{React.cloneElement(React.Children.only(children), {
				ref: elementRef,
				style: {
					...children.props.style,
					whiteSpace: 'nowrap',
					overflow: 'hidden',
					textOverflow: 'ellipsis',
				},
			})}
		</Tooltip>
	)
}

export default OverflowTip
