import React from 'react'
import { Flex, Box } from 'theme-ui'

export default function Index() {
	return (
		<Flex sx={{ flex: 1 }}>
			<Box sx={{ display: ['block', 'none'] }}> Mobile</Box>
			<Box sx={{ display: ['none', 'block', 'none'] }}>Tablet</Box>
			<Box sx={{ display: ['none', 'none', 'block', 'none'] }}> Laptop</Box>
			<Box sx={{ display: ['none', 'none', 'none', 'block', 'none'] }}>
				Desktop
			</Box>
			<Box sx={{ display: ['none', 'none', 'none', 'none', 'block'] }}>
				Large Desktop
			</Box>
		</Flex>
	)
}
