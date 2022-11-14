import * as React from 'react'

function DocumentIcon(props) {
	return (
		<svg
			width={20}
			height={24}
			viewBox='0 0 20 24'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<path
				d='M4.167 22.5h11.666a2.333 2.333 0 002.334-2.333V8.983c0-.31-.123-.606-.342-.825l-6.317-6.316a1.167 1.167 0 00-.825-.342H4.167a2.333 2.333 0 00-2.334 2.333v16.334A2.333 2.333 0 004.167 22.5z'
				stroke='#fff'
				strokeOpacity={0.7}
				strokeWidth={2}
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	)
}

export default DocumentIcon
