import { get } from 'lodash'

export const getParamsFromObject = (object: any) =>
	Object.keys(object).reduce((urlSearchParams, key) => {
		urlSearchParams.append(key, get(object, key))
		return urlSearchParams
	}, new URLSearchParams())
