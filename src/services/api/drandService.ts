import { dRandAxios } from 'services/axios'

export interface DrandResponse {
	round: string
	signature: string
	previous_signature: string
}

export class DrandService {
	public static async getRandomness(): Promise<DrandResponse> {
		const randomnessResponse = await dRandAxios.get('/public/latest')

		const { data } = randomnessResponse

		return {
			round: data.round,
			signature: Buffer.from(data.signature, 'hex').toString('base64'),
			previous_signature: Buffer.from(data.previous_signature, 'hex').toString(
				'base64'
			),
		}
	}
}
