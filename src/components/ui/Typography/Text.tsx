import React from 'react'

import { Box } from 'theme-ui'

const Text = React.forwardRef((props: any, ref) => (
	<Box ref={ref} tx='text' {...props} />
))

export default Text
