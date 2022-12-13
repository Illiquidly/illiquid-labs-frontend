import React from 'react'

const defaultProps = {
	condition: undefined,
}

interface IfProps {
	children: React.ReactNode
	condition: any
}

interface StaticComponents {
	Then: React.FC<{ children: any }>
	Else: React.FC<{ children: any }>
}

// TODO: think about usage of this If statement, Babel has some similar solutions that could replace it. But needs some configuration
export function If({ children, condition }: IfProps): any & StaticComponents {
	if (React.Children.count(children) === 1) {
		return condition ? children : null
	}

	return React.Children.map(children as any, (element: React.ReactElement) => {
		const { type: Component }: any = element

		if (condition) {
			if (Component.type === 'then') {
				return element
			}
		} else if (Component.type === 'else') {
			return element
		}

		return null
	})
}

If.defaultProps = defaultProps

export function Then({ children }: { children: any }) {
	return children
}

Then.type = 'then'

export function Else({ children }: { children: any }) {
	return children
}

Else.type = 'else'

If.Then = Then as React.FC<{ children: any }>
If.Else = Else as React.FC<{ children: any }>

export default If
