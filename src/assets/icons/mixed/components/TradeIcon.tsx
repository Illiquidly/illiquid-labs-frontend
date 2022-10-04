import * as React from 'react'

function TradeIcon(props) {
	return (
		<svg
			width={20}
			height={21}
			viewBox='0 0 20 21'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<path
				fillRule='evenodd'
				clipRule='evenodd'
				d='M2.849 9.363a.987.987 0 01-.552-.3 1.098 1.098 0 01-.233-1.125c.049-.141.126-.274.233-.386l4.119-4.337a.986.986 0 011.436 0 1.117 1.117 0 010 1.512L5.467 7.238h11.517c.555 0 1.016.485 1.016 1.07 0 .585-.46 1.07-1.03 1.07H3.016a.949.949 0 01-.167-.015zm11.67 5.208H3.016C2.461 14.57 2 14.086 2 13.5c0-.585.46-1.07 1.016-1.07h13.968c.555 0 1.016.485 1.016 1.07 0 .33-.146.627-.375.824l-4.053 4.267a.98.98 0 01-1.436 0 1.117 1.117 0 010-1.512l2.383-2.51z'
				fill='currentColor'
			/>
		</svg>
	)
}

export default TradeIcon
