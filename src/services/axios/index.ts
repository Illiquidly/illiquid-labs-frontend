import client from 'axios'
import { API_URL } from 'constants/core'

export const axios = client.create({
	baseURL: API_URL,
})
