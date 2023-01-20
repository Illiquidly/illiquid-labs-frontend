import client from 'axios'
import { API_URL, ASSETS_URL } from 'constants/core'

export const axios = client.create({
	baseURL: API_URL,
})

export const assetsAxios = client.create({
	baseURL: ASSETS_URL,
})
