import { useQuery, useQueryClient } from '@tanstack/react-query'
import { HEADER_ACTIONS } from 'constants/useQueryKeys'
import React from 'react'

// Allows user to set header actions. On right section.
export default function useHeaderActions(
	headerComponent: React.ReactNode = null
) {
	const queryClient = useQueryClient()
	const { data } = useQuery([HEADER_ACTIONS], () => headerComponent, {
		initialData: headerComponent,
		staleTime: Infinity,
	})

	const setHeaderComponent = component =>
		queryClient.setQueryData([HEADER_ACTIONS], component)

	React.useEffect(() => {
		setHeaderComponent(headerComponent)
	}, [])

	return data
}
