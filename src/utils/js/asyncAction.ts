export function asyncAction(promise: Promise<unknown>) {
	return Promise.resolve(promise)
		.then(data => [null, data])
		.catch(error => [error])
}
