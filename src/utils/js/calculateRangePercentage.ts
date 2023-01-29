export function calculateRangePercentage(
	input: number,
	min: number,
	max: number
) {
	const percentage = ((input - min) * 100) / (max - min)

	if (Number.isNaN(percentage) || !percentage) {
		return 0
	}

	if (percentage > 100) {
		return 100
	}

	return percentage
}
