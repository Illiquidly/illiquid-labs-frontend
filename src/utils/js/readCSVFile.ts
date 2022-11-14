import * as papa from 'papaparse'
import { keysToCamel } from 'utils/js/keysToCamel'

export function trim(s: string) {
	return String(s).replace(/^\s+|\s+$/g, '')
}

export async function readCSVFile<T>(file: File): Promise<T[]> {
	return new Promise((resolve, reject) => {
		const reader = new FileReader()

		reader.onload = innerEvent => {
			if (innerEvent.target) {
				try {
					const csv = papa.parse(innerEvent.target.result as any, {
						header: true,
						transformHeader: h => h.trim(),
					})

					resolve(keysToCamel(csv))
				} catch (error) {
					reject(error)
				}
			}
		}
		reader.readAsText(file)
	})
}
