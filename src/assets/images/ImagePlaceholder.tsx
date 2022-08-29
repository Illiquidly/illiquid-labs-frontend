import * as React from 'react'

function ImagePlaceholder(props) {
	return (
		<svg
			width={85}
			height={80}
			viewBox='0 0 85 80'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<path
				opacity={0.1}
				fillRule='evenodd'
				clipRule='evenodd'
				d='M.5 12C.5 5.373 6.141 0 13.1 0h58.8c6.959 0 12.6 5.373 12.6 12v56c0 6.628-5.641 12-12.6 12H13.1C6.141 80 .5 74.628.5 68V12zm71.749 59.986c2.026-.158 1.993-2.601.62-4.03L36.488 30.12c-5.154-5.355-14.083-5.154-18.967.427l-7.649 8.742a3.886 3.886 0 00-.973 2.56V68c0 2.21 1.88 4 4.2 4h58.8c.118 0 .234-.005.349-.014zM63.5 28c4.64 0 8.4-3.582 8.4-8s-3.76-8-8.4-8c-4.64 0-8.4 3.582-8.4 8s3.76 8 8.4 8z'
				fill='#7F8596'
			/>
		</svg>
	)
}

export default ImagePlaceholder
