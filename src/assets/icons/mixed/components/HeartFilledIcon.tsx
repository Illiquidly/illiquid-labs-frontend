import * as React from 'react'

function HeartFilledIcon(props) {
	return (
		<svg
			width={18}
			height={16}
			viewBox='0 0 18 16'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<path
				d='M12.629.5A5.371 5.371 0 0118 5.871c0 2.837-1.081 4.275-5.702 7.869l-1.993 1.55a2.125 2.125 0 01-2.61 0l-1.993-1.55C1.082 10.146 0 8.708 0 5.87A5.371 5.371 0 015.371.5c1.256 0 2.403.46 3.414 1.346L9 2.043l.215-.197C10.225.96 11.373.5 12.629.5z'
				fill='#DC2626'
			/>
		</svg>
	)
}

export default HeartFilledIcon
