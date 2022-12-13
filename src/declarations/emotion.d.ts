import '@emotion/react'
import { ExactTheme } from 'constants/theme'

declare module '@emotion/react' {
	// eslint-disable-next-line @typescript-eslint/no-empty-interface
	export interface Theme extends ExactTheme {}
}
