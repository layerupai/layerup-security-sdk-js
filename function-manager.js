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

	async maskPrompt(messages, metadata) {
		try {
			const response = await this.apiClient.request({
				method: 'post',
				url: '/mask/prompt',
				data: JSON.stringify({ messages, metadata }),
			});
			return response;
		} catch (error) {
			return { error };
		}
	}

	async logError(error, messages, metadata) {
		try {
			const response = await this.apiClient.request({
				method: 'post',
				url: '/log/error',
				data: JSON.stringify({ error, messages, metadata }),
			});
			return response;
		} catch (error) {
			return { error };
		}
	}

	async executeRules(rules, messages, metadata) {
		try {
			const response = await this.apiClient.request({
				method: 'post',
				url: '/rules/execute',
				data: JSON.stringify({ rules, messages, metadata }),
			});
			return response;
		} catch (error) {
			return { error };
		}
	}
}

module.exports = FunctionManager;
