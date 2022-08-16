import React from 'react'

// NOTE : https://transform.tools/ to convert svg icons to jsx

function AccessibilityOutlineIcon(props) {
	return (
		<svg
			width={20}
			height={20}
			viewBox='0 0 20 20'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<path
				d='M10 7.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM9.001 9.947a9.194 9.194 0 01-2.806-.764.75.75 0 11.618-1.366A7.72 7.72 0 0010 8.5a7.72 7.72 0 003.187-.683.75.75 0 01.618 1.366 9.195 9.195 0 01-2.806.764L11 10c0 .576.099 1.147.293 1.69l.913 2.558a.75.75 0 01-1.412.504l-.7-1.958a.1.1 0 00-.188 0l-.7 1.958a.75.75 0 01-1.412-.504l.913-2.558C8.9 11.15 9 10.58 9 10.008V10l.001-.053z'
				fill='#99A2AD'
			/>
			<path
				fillRule='evenodd'
				clipRule='evenodd'
				d='M18.5 10a8.5 8.5 0 11-17 0 8.5 8.5 0 0117 0zM17 10a7 7 0 11-14 0 7 7 0 0114 0z'
				fill='#99A2AD'
			/>
		</svg>
	)
}

export { AccessibilityOutlineIcon }
