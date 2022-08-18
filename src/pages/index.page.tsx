import React from 'react'
import { Flex, Box } from 'reflexbox/styled-components'

export default function Index() {
	return (
		<Flex>
			<Box display={{ _: 'block', sm: 'none' }}>Only Mobile</Box>
			<Box display={{ _: 'none', sm: 'block', md: 'none' }}>Only Tablet</Box>
			<Box display={{ _: 'none', md: 'block', lg: 'none' }}>Desktop</Box>
			<Box display={{ _: 'none', lg: 'block', xl: 'none' }}>Large Desktop</Box>
			<Box display={{ _: 'none', xl: 'block', xxl: 'none' }}>
				Very Large Desktop
			</Box>
		</Flex>
	)
}
