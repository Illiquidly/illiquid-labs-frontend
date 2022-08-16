import React from 'react'

import { Box } from 'reflexbox/styled-components'

const Text = React.forwardRef((props: any, ref) => (
	<Box ref={ref} tx='text' {...props} />
))

export default Text
