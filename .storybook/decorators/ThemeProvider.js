import React from 'react'
import { ThemeProvider } from 'theme-ui'
import { theme } from '../../src/components/theme/theme'

const ThemeProviderDecorator = storyFn => (
	<ThemeProvider theme={theme}>{storyFn()}</ThemeProvider>
)

export default ThemeProviderDecorator
