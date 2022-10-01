import * as React from 'react'

function ModalErrorCircleIcon(props) {
	return (
		<svg
			width={32}
			height={32}
			viewBox='0 0 32 32'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<circle cx={16} cy={16} r={16} fill='#EA3943' />
			<path
				fillRule='evenodd'
				clipRule='evenodd'
				d='M16 6.667a1.898 1.898 0 00-1.895 1.997l.492 9.338.007.123A1.333 1.333 0 0016 19.334c.064 0 .096 0 .123-.002a1.333 1.333 0 001.28-1.33l.492-9.338A1.898 1.898 0 0016 6.667zm0 14.667a2 2 0 100 4 2 2 0 000-4z'
				fill='#fff'
			/>
		</svg>
	)
}

export default ModalErrorCircleIcon
