import { NetworkId } from 'types'

export const LCD_URLS: { [key in NetworkId]: string } = {
	'pisco-1': 'https://pisco-lcd.terra.dev',
	'phoenix-1': 'https://phoenix-lcd.terra.dev',
}

export const FCD_URLS: { [key in NetworkId]: string } = {
	'pisco-1': 'https://pisco-fcd.terra.dev',
	'phoenix-1': 'https://phoenix-fcd.terra.dev',
}

export const CHAIN_DENOMS: { [key in NetworkId]: string } = {
	'pisco-1': 'uluna',
	'phoenix-1': 'uluna',
}

export const CHAIN_CURRENCIES: { [key in NetworkId]: string } = {
	'pisco-1': 'luna',
	'phoenix-1': 'luna',
}
