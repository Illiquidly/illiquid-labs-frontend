/* eslint-disable @typescript-eslint/no-explicit-any */
const toCamel = (s: string) =>
	s.replace(/([-_][a-z])/gi, $1 =>
		$1.toUpperCase().replace('-', '').replace('_', '')
	)

function isArray(a: any) {
	return Array.isArray(a)
}

function isObject(o: any) {
	return o === Object(o) && !isArray(o) && typeof o !== 'function'
}

function keysToCamel(o: any) {
	if (isObject(o)) {
		const n: any = {}

		Object.keys(o).forEach((k: string) => {
			n[toCamel(k)] = keysToCamel(o[k])
		})

		return n
	}
	if (isArray(o)) {
		return o.map((i: any) => keysToCamel(i))
	}

	return o
}

export { keysToCamel }
