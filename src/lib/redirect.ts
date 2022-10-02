import { useEffect } from 'react'
import { useRouter } from 'next/router'
import languageDetector from './languageDetector'

export const useRedirect = (param?: string) => {
	const router = useRouter()

	const to = param || router.asPath

	// language detection
	useEffect(() => {
		const detectedLng = languageDetector.detect()
		if (to.startsWith(`/${detectedLng}`) && router.route === '/404') {
			// prevent endless loop
			router.replace(`/${detectedLng}${router.route}`)
			return
		}
		languageDetector?.cache?.(detectedLng as string)
		router.replace(`/${detectedLng}${to}`)
	}, [])

	return null
}

export const Redirect = ({ to }: { to: string }) => {
	useRedirect(to)
	return null
}

export const getRedirect = to => () => {
	useRedirect(to)
	return null
}
