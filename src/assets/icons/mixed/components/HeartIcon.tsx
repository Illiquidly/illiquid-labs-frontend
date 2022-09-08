import * as React from 'react'

function HeartIcon(props) {
	return (
		<svg
			width={18}
			height={16}
			viewBox='0 0 18 16'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<path
				d='M8.325 2.78L9 3.399l.675-.617.206-.19c.846-.737 1.762-1.091 2.748-1.091A4.371 4.371 0 0117 5.871c0 1.249-.226 2.1-.926 3.061-.755 1.036-2.073 2.216-4.39 4.018L9.69 14.5a1.125 1.125 0 01-1.382 0l-1.993-1.55C4 11.148 2.681 9.968 1.926 8.932 1.226 7.972 1 7.12 1 5.872A4.371 4.371 0 015.371 1.5c.986 0 1.902.354 2.748 1.092l.206.189z'
				stroke='#F9FAFB'
				strokeWidth={2}
			/>
		</svg>
	)
}

export default HeartIcon
