import client from 'axios'

export const baseURL = 'https://api.illiquidly.io:8443/'

export const axios = client.create({
	baseURL,
})

export const migratorURL = 'https://api.illiquidly.io:8444/'

export const migratorClient = client.create({
	baseURL: migratorURL,
})
