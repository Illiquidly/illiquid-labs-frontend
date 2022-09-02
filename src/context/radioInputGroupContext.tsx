import React from 'react'

export type RadioInputGroupContextProps = {
	children: React.ReactNode
	name: string
	disabled?: boolean
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
	value: string | number | boolean
}

const RadioInputGroupContext = React.createContext<
	Partial<RadioInputGroupContextProps>
>({})

export default RadioInputGroupContext
