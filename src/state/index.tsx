import { atom } from 'recoil'

export const appLoadingState = atom({
	key: 'appLoading',
	default: false,
})
