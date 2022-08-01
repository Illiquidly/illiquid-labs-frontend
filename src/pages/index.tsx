import { Button, Flex } from 'rebass/styled-components'

export default function Index() {
	return (
		<div>
			<Flex>
				<Button variant='primary' mr={2}>
					Beep
				</Button>
				<Button variant='secondary'>Boop</Button>
			</Flex>
		</div>
	)
}
