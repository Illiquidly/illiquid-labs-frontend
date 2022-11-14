import * as React from 'react'

function UploadIcon(props) {
	return (
		<svg
			width={17}
			height={20}
			viewBox='0 0 17 20'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<path
				fillRule='evenodd'
				clipRule='evenodd'
				d='M.1 18.4a1.2 1.2 0 011.2-1.2h14.4a1.2 1.2 0 110 2.4H1.3a1.2 1.2 0 01-1.2-1.2zM4.05 6.048a1.2 1.2 0 010-1.697l3.6-3.6a1.2 1.2 0 011.697 0l3.6 3.6a1.2 1.2 0 11-1.697 1.697L9.7 4.497V13.6a1.2 1.2 0 01-2.4 0V4.497L5.748 6.048a1.2 1.2 0 01-1.697 0z'
				fill='#fff'
			/>
		</svg>
	)
}

export default UploadIcon
