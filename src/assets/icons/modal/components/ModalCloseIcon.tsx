import * as React from 'react'

function ModalCloseIcon(props) {
	return (
		<svg
			width={32}
			height={32}
			viewBox='0 0 32 32'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<rect width={32} height={32} rx={16} fill='current' />
			<path
				d='M11 21l10-10M21 21L11 11'
				stroke='#fff'
				strokeWidth={2}
				strokeMiterlimit={10}
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	)
}

export default ModalCloseIcon
