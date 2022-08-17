import * as React from 'react'
import { SVGProps } from 'react'

const SvgDiamondOutline20 = (props: SVGProps<SVGSVGElement>) => (
	<svg
		width={20}
		height={20}
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
		{...props}
	>
		<path
			fillRule='evenodd'
			clipRule='evenodd'
			d='M7.983 2.25H6c-.82 0-1.655.368-2.186 1.032L.932 6.885A1.747 1.747 0 0 0 .97 9.117l7.701 8.985a1.75 1.75 0 0 0 2.658 0l7.701-8.985c.271-.316.412-.705.421-1.097v-.008a1.746 1.746 0 0 0-.383-1.127l-2.882-3.603C15.655 2.618 14.82 2.25 14 2.25h-2.018c.012 0-.011 0 0 0H7.983c-.012 0 .011 0 0 0Zm3.51 1.5H8.507l-1.4 3.5h5.784l-1.4-3.5Zm1.615 0 1.4 3.5h2.931l-2.424-3.03A1.328 1.328 0 0 0 14 3.75h-.892Zm4.261 5h-2.882l-3.103 6.983 5.985-6.983ZM10 15.153l2.846-6.403H7.154L10 15.153ZM5.513 8.75l3.103 6.983L2.631 8.75h2.882Zm-.02-1.5 1.4-3.5H6c-.395 0-.787.184-1.015.47L2.56 7.25h2.932Z'
			fill='#99A2AD'
		/>
	</svg>
)

export default SvgDiamondOutline20
