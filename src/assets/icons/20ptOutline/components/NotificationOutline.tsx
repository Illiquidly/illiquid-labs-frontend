import * as React from 'react'
import { SVGProps } from 'react'

const SvgNotificationOutline20 = (props: SVGProps<SVGSVGElement>) => (
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
			d='M5.5 8a4.5 4.5 0 0 1 9-.008v1.674c0 .297.106.585.299.81l1.523 1.787a.75.75 0 0 1-.571 1.237H4.249a.75.75 0 0 1-.57-1.236L5.2 10.477a1.25 1.25 0 0 0 .299-.811V8Zm-1.488-.385a6 6 0 0 1 11.976 0c.008.044.012.089.012.135v1.823l1.463 1.717c1.245 1.461.207 3.71-1.712 3.71h-2.076a3.751 3.751 0 0 1-7.35 0H4.249c-1.919 0-2.957-2.249-1.712-3.71L4 9.575V7.75c0-.046.004-.091.012-.135ZM10 16.5A2.25 2.25 0 0 1 7.878 15h4.244A2.251 2.251 0 0 1 10 16.5Z'
			fill='#99A2AD'
		/>
	</svg>
)

export default SvgNotificationOutline20
