import React, {
	useRef,
	useState,
	useEffect,
	ReactElement,
	JSXElementConstructor,
} from 'react'
import { Tooltip } from '../tooltip/Tooltip'

function OverflowTip({
	children,
}: {
	children: ReactElement<any, string | JSXElementConstructor<any>>
}) {
	const [isOverflowed, setIsOverflow] = useState(false)
	const textElementRef = useRef<any>()

	const compareSize = () => {
		setIsOverflow(
			textElementRef.current.scrollWidth > textElementRef.current.clientWidth
		)
	}

	useEffect(() => {
		compareSize()
		window.addEventListener('resize', compareSize)
	}, [])

	useEffect(
		() => () => {
			window.removeEventListener('resize', compareSize)
		},
		[]
	)

	return (
		<Tooltip
			placement='top'
			overlay={React.cloneElement(children, { style: { color: '#000' } })}
			{...(!isOverflowed ? { visible: false } : {})}
		>
			{React.cloneElement(React.Children.only(children), {
				ref: textElementRef,
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
