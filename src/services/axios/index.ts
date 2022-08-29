import client from 'axios'

export const baseURL = 'https://api.illiquidly.io/'

export const axios = client.create({
	baseURL,
})
