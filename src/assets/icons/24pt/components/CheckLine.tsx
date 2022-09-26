import * as React from 'react'

function CheckLineSvg(props: React.SVGProps<SVGSVGElement>) {
	const { fill } = props
	return (
		<svg
			width={24}
			height={24}
			viewBox='0 0 24 24'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<path
				fillRule='evenodd'
				clipRule='evenodd'
				d='M18.707 7.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L10 14.586l7.293-7.293a1 1 0 011.414 0z'
				// fill=''
				fill={fill || 'currentColor'}
			/>
		</svg>
	)
}

export default CheckLineSvg
