import client from 'axios'

export const baseURL = 'https://api.illiquidlabs.io:3000/'

export const axios = client.create({
	baseURL,
})
