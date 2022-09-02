import React from 'react'
import RadioInputGroupContext, {
	RadioInputGroupContextProps,
} from 'context/radioInputGroupContext'

const RadioInputGroupProvider = ({
	children,
	...otherProps
}: RadioInputGroupContextProps) => (
	<RadioInputGroupContext.Provider value={otherProps}>
		{children}
	</RadioInputGroupContext.Provider>
)

export default RadioInputGroupProvider
