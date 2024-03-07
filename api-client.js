const axios = require('axios');
const { getConfig } = require('./config');

class APIClient {
	constructor() {
		const { baseURL, apiKey } = getConfig();
		if (!apiKey) {
			throw new Error(
				'API key is not set. Please set the API key before using the SDK.'
			);
		}

		this.client = axios.create({
			baseURL: baseURL,
			headers: {
				'Layerup-API-Key': apiKey,
				'Content-Type': 'application/json',
			},
		});
	}

	async request({ method, url, data = {} }) {
		const response = await this.client({
			method,
			url,
			data,
		});
		return response.data;
	}
}

module.exports = APIClient;
