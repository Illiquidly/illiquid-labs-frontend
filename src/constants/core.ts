import { NetworkId } from 'types'

export const LCD_URLS: { [key in NetworkId]: string } = {
	'pisco-1': 'https://pisco-lcd.terra.dev',
	'columbus-5': 'https://columbus-lcd.terra.dev',
	'phoenix-1': 'https://phoenix-lcd.terra.dev',
}

export const FCD_URLS: { [key in NetworkId]: string } = {
	'pisco-1': 'https://pisco-fcd.terra.dev',
	'columbus-5': 'https://columbus-fcd.terra.dev',
	'phoenix-1': 'https://phoenix-fcd.terra.dev',
}

export const CHAIN_DENOMS: { [key in NetworkId]: string } = {
	'pisco-1': 'uluna',
	'columbus-5': 'uluna',
	'phoenix-1': 'uluna',
}

type ChainKeys = keyof typeof CHAIN_DENOMS

export const CHAIN_CURRENCIES: { [key in ChainKeys]: string } = {
	'pisco-1': 'luna',
	'columbus-5': 'uluna',
	'phoenix-1': 'luna',
}