import '@emotion/react'
import { ExactTheme } from 'components/theme/theme'

declare module '@emotion/react' {
	// eslint-disable-next-line @typescript-eslint/no-empty-interface
	export interface Theme extends ExactTheme {}
}
