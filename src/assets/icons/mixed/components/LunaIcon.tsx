import * as React from 'react'
import { Flex } from 'theme-ui'

function LunaIcon(props) {
	return (
		<Flex sx={{ marginBottom: '2px' }}>
			<svg
				xmlns='http://www.w3.org/2000/svg'
				xmlnsXlink='http://www.w3.org/1999/xlink'
				viewBox='0 0 277.43 300'
				width='20px'
				height='20px'
				{...props}
			>
				<defs>
					<linearGradient
						id='a'
						x1={107.88}
						y1={180.59}
						x2={159.63}
						y2={302.5}
						gradientUnits='userSpaceOnUse'
					>
						<stop offset={0} stopColor='#f7d45c' />
						<stop offset={1} stopColor='#de3633' />
					</linearGradient>
					<linearGradient
						id='b'
						x1={46.6}
						y1={58.2}
						x2={167.36}
						y2={193.9}
						xlinkHref='#a'
					/>
				</defs>
				<g data-name='Layer 2'>
					<g data-name='Layer 6'>
						<ellipse cx={132.59} cy={167.16} rx={131.86} ry={132.03} fill='#f2e373' />
						<path
							d='M186.17 153.48L6 207.22c8.22 26.19 25 50.35 50.42 68.21 62.74 44 141 25.28 190.06-27.26 1.05-1.13 0-3-1.42-2.36a48.06 48.06 0 01-29.58 3.68A47.28 47.28 0 01177.91 212a48 48 0 0133.6-55.37z'
							fillRule='evenodd'
							fill='url(#a)'
						/>
						<path
							d='M165.36 143a82.69 82.69 0 0010.33-5.11 81.64 81.64 0 01101.38 16.28 1.45 1.45 0 01-1.42 2.35c-22.46-4.73-46.67-5.66-65.11.37-22.23 7.29-38.54 23.11-49.83 42.74-16.54 28.78-23.35 36.92-50.07 47.34-46.56 18.18-90 1.71-104.63-39.68A133.12 133.12 0 0171.69 49.54C87.82 41 107.38 33.8 123.76 29.06 139.55 24.55 166.42 18 173.35 1a1.57 1.57 0 013 .43c2.77 20.09-1.83 29.24-13.36 40.09-12.5 11.77-27.93 17.13-41.77 25.63-21.11 14-27.8 39.57-13.8 60.68 8.32 12.55 22.49 19.21 37.38 19.21a56.82 56.82 0 0013.55-1.68 52.56 52.56 0 007.01-2.36z'
							fillRule='evenodd'
							fill='url(#b)'
						/>
					</g>
				</g>
			</svg>
		</Flex>
	)
}

export default LunaIcon
