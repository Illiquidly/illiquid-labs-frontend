import React from 'react'
import { atom, useRecoilState } from 'recoil'

export default function useHeaderActions(
	headerComponent: React.ReactNode = null
) {
	const [headerAction, setHeaderAction] = useRecoilState(
		atom({
			key: 'headerActionsState',
			default: headerComponent ?? null,
		})
	)

	React.useEffect(() => {
		setHeaderAction(headerComponent)
		return () => setHeaderAction(null)
	}, [])

	return headerAction
}
