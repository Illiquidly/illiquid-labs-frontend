import { addDecorator } from '@storybook/react'
import ThemeProvider from './decorators/ThemeProvider'
import '../src/pages/styles.css'

export const parameters = {
	actions: { argTypesRegex: '^on[A-Z].*' },
	controls: {
		matchers: {
			color: /(background|color)$/i,
			date: /Date$/,
		},
	},
}

addDecorator(story => (
	<div style={{ padding: '3rem', display: 'flex' }}>{story()}</div>
))

addDecorator(ThemeProvider)
