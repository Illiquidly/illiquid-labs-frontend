import * as React from 'react'

function BurgerMenuIcon(props) {
	return (
		<svg
			width={24}
			height={25}
			viewBox='0 0 24 25'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<rect x={2} y={7.5} width={20} height={2} rx={1} fill='currentColor' />
			<rect x={2} y={15.5} width={20} height={2} rx={1} fill='currentColor' />
		</svg>
	)
}

export default BurgerMenuIcon
