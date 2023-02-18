import React, { useRef, ReactElement, JSXElementConstructor } from 'react'
import { Tooltip } from '../tooltip/Tooltip'

function OverflowTip({
	children,
}: {
	children: ReactElement<any, string | JSXElementConstructor<any>>
}) {
	const [isOverflowed, setIsOverflow] = React.useState(false)
	const elementRef = useRef<any>()

	const compareSize = () => {
		setIsOverflow(elementRef.current.scrollWidth > elementRef.current.clientWidth)
	}

	React.useEffect(() => {
		compareSize()
		window.addEventListener('resize', compareSize)
	}, [])

	React.useEffect(
		() => () => {
			window.removeEventListener('resize', compareSize)
		},
		[]
	)

	return (
		<Tooltip
			placement='top'
			overlay={React.cloneElement(children, {
				style: { background: 'transparent', color: '#000' },
			})}
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
