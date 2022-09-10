import * as React from 'react'

function InputSearchIcon(props) {
	return (
		<svg
			width={20}
			height={20}
			viewBox='0 0 20 20'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<path
				d='M9.167 15.833a6.667 6.667 0 100-13.333 6.667 6.667 0 000 13.333zM14.166 14.167L17.5 17.5'
				stroke='#5A7889'
				strokeWidth={2}
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	)
}

export default InputSearchIcon
