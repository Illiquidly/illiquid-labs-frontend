export const truncateLongString = (value: string, count = 15) => {
	if (value.length < count) {
		return value
	}
	return value.slice(0, count).concat('...')
}
