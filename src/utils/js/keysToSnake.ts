/* eslint-disable @typescript-eslint/no-explicit-any */

import { snakeCase } from 'lodash'

function isArray(a) {
	return Array.isArray(a)
}

function isObject(o) {
	return o === Object(o) && !isArray(o) && typeof o !== 'function'
}

function keysToSnake(o) {
	if (isObject(o)) {
		const n = {}

		Object.keys(o).forEach((k: string) => {
			n[snakeCase(k)] = keysToSnake(o[k])
		})

		return n
	}
	if (isArray(o)) {
		return o.map(i => keysToSnake(i))
	}

	return o
}

export { keysToSnake }
