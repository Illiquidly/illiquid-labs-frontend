import * as React from 'react'

function ImageIcon(props) {
	return (
		<svg
			width={18}
			height={18}
			viewBox='0 0 18 18'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<path
				d='M15.375 0H2.625A2.625 2.625 0 000 2.625v12.75A2.625 2.625 0 002.625 18h12.75A2.625 2.625 0 0018 15.375V2.625A2.625 2.625 0 0015.375 0zM8 13.51l3.199-4.122a.375.375 0 01.596.005L15.55 14.4a.375.375 0 01-.3.6H2.767a.375.375 0 01-.296-.605l2.743-3.527a.375.375 0 01.584-.01L8 13.51z'
				fill='#5A7889'
			/>
		</svg>
	)
}

export default ImageIcon
