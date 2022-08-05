const getShortText = (text: string, lettersCount: number) =>
	`${text.slice(0, lettersCount)}...${text.slice(text.length - lettersCount)}`

export default getShortText
