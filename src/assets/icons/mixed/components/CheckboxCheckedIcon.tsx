import * as React from 'react'

function CheckboxCheckedIcon(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg
			width={13}
			height={9}
			viewBox='0 0 13 9'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<path
				d='M11.267 1.5L4.85 7.917 1.934 5'
				stroke='#F0F6FF'
				strokeWidth={2}
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	)
}

export default CheckboxCheckedIcon
