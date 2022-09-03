import * as React from 'react'

function TargetIcon(props) {
	return (
		<svg
			width={22}
			height={22}
			viewBox='0 0 22 22'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<path d='M12.856 11a1.8 1.8 0 11-3.6 0 1.8 1.8 0 013.6 0z' fill='#F3F7FB' />
			<path
				fillRule='evenodd'
				clipRule='evenodd'
				d='M11.056 17a6 6 0 100-12 6 6 0 000 12zm0-1.8a4.2 4.2 0 100-8.4 4.2 4.2 0 000 8.4z'
				fill='#F3F7FB'
			/>
			<path
				fillRule='evenodd'
				clipRule='evenodd'
				d='M11.056 21.2c5.634 0 10.2-4.566 10.2-10.2 0-5.633-4.566-10.2-10.2-10.2C5.423.8.856 5.367.856 11c0 5.634 4.567 10.2 10.2 10.2zm8.4-10.2a8.4 8.4 0 11-16.8 0 8.4 8.4 0 0116.8 0z'
				fill='#F3F7FB'
			/>
		</svg>
	)
}

export default TargetIcon
