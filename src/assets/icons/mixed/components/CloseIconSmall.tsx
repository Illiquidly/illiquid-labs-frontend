import * as React from 'react'

function CloseIconSmall(props) {
	return (
		<svg
			width={10}
			height={10}
			viewBox='0 0 10 10'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<path
				fillRule='evenodd'
				clipRule='evenodd'
				d='M.438.439a.68.68 0 01.962 0l3.6 3.6L8.6.44a.68.68 0 11.963.962L5.963 5l3.6 3.6a.68.68 0 11-.962.963L5 5.964 1.4 9.563a.68.68 0 01-.962-.962l3.6-3.6L.438 1.4a.68.68 0 010-.962z'
				fill='#fff'
			/>
		</svg>
	)
}

export default CloseIconSmall
