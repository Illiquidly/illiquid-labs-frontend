import { noop } from 'lodash'
import * as React from 'react'

type UseIsOverflow = [boolean, () => void]

export const useIsOverflow = (ref, callback = noop): UseIsOverflow => {
	const [isOverflow, setIsOverflow] = React.useState(false)

	const trigger = React.useCallback(() => {
		const hasOverflow =
			ref?.current?.scrollHeight > ref?.current.clientHeight ||
			ref?.current.scrollWidth > ref?.current.clientWidth

		setIsOverflow(hasOverflow)

		callback?.(hasOverflow)
	}, [ref, callback])

	React.useLayoutEffect(() => {
		if (ref?.current) {
			trigger()
		}
	}, [callback, ref, trigger])

	return [isOverflow, trigger]
}
