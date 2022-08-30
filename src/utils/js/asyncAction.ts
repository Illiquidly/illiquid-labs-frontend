export function asyncAction<T>(promise: Promise<T>): Promise<[any?, T?]> {
	return Promise.resolve(promise)
		.then((data: T) => [null, data])
		.catch(error => [error]) as Promise<[any?, T?]>
}
