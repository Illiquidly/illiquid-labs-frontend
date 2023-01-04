import React from 'react'

export type ForwardRefProps<T> = {
	forwardedRef?: T
}

/**
 * The purpose of this HOC is to enforce consistent prop naming when forwarding refs
 * */
function withForwardRef<Ref, Props>(Component: React.ComponentType<any>) {
	return React.forwardRef<Ref, Props & ForwardRefProps<Ref>>(
		({ forwardedRef, ...props }, ref) => {
			const reference = forwardedRef || ref

			const componentProperties = {
				...props,
				...(reference ? { forwardedRef: reference } : {}),
			}

			return <Component {...componentProperties} />
		}
	)
}

export default withForwardRef
