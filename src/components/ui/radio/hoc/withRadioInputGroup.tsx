import RadioInputGroupContext from 'context/radioInputGroupContext'
import React from 'react'

export default function withRadioInputGroup<T>(
	Component: React.ComponentType<T>
) {
	return (props: T) => (
		<RadioInputGroupContext.Consumer>
			{inputGroup => <Component {...props} inputGroup={inputGroup} />}
		</RadioInputGroupContext.Consumer>
	)
}
