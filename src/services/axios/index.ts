import client from 'axios'

export const baseURL = 'https://api.illiquidlabs.io/'

export const axios = client.create({
	baseURL,
})
