const APIClient = require('./api-client');

class FunctionManager {
	constructor() {
		this.apiClient = new APIClient();
	}

	async interceptPrompt(messages, metadata) {
		try {
			const response = await this.apiClient.request({
				method: 'post',
				url: '/intercept/prompt',
				data: JSON.stringify({ messages, metadata }),
			});
			return response;
		} catch (error) {
			return { error };
		}
	}

	async interceptResponse(messages, metadata) {
		try {
			const response = await this.apiClient.request({
				method: 'post',
				url: '/intercept/response',
				data: JSON.stringify({ messages, metadata }),
			});
			return response;
		} catch (error) {
			return { error };
		}
	}
}

module.exports = FunctionManager;