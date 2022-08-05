/* eslint-disable @typescript-eslint/no-explicit-any */

import { snakeCase } from 'lodash'

function isArray(a: any) {
	return Array.isArray(a)
}

function isObject(o: any) {
	return o === Object(o) && !isArray(o) && typeof o !== 'function'
}

function keysToSnake(o: any) {
	if (isObject(o)) {
		const n: any = {}

		Object.keys(o).forEach((k: string) => {
			n[snakeCase(k)] = keysToSnake(o[k])
		})

		return n
	}
	if (isArray(o)) {
		return o.map((i: any) => keysToSnake(i))
	}

	return o
}

export { keysToSnake }
