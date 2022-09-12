import * as React from 'react'

function FilterIcon(props) {
	return (
		<svg
			width={17}
			height={14}
			viewBox='0 0 17 14'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<path
				fillRule='evenodd'
				clipRule='evenodd'
				d='M5.5 4.3a1.2 1.2 0 110-2.4 1.2 1.2 0 010 2.4zM2.637 2.2a3.001 3.001 0 015.725 0H16A.9.9 0 1116 4H8.362a3.001 3.001 0 01-5.725 0H1a.9.9 0 010-1.8h1.637zm8.863 9.9a1.2 1.2 0 100-2.4 1.2 1.2 0 000 2.4zm2.862-2.1a3.001 3.001 0 00-5.725 0H1a.9.9 0 100 1.8h7.637a3.001 3.001 0 005.725 0H16a.9.9 0 100-1.8h-1.638z'
				fill='#fff'
			/>
		</svg>
	)
}

export default FilterIcon
