import React from 'react'
import { Flex, Box } from 'reflexbox/styled-components'

export default function Index() {
	return (
		<Flex>
			<Box display={['block', 'none']}> Mobile</Box>
			<Box display={['none', 'block', 'none']}>Tablet</Box>
			<Box display={['none', 'none', 'block', 'none']}> Laptop</Box>
			<Box display={['none', 'none', 'none', 'block', 'none']}>Desktop</Box>
			<Box display={['none', 'none', 'none', 'none', 'block']}>Large Desktop</Box>
		</Flex>
	)
}
