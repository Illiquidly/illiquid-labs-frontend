import React from 'react'
import { ThemeProvider } from 'styled-components'
import { theme } from '../../src/components/theme/theme'

const ThemeProviderDecorator = storyFn => (
	<ThemeProvider theme={theme}>{storyFn()}</ThemeProvider>
)

export default ThemeProviderDecorator
