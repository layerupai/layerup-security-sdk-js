const { setAPIKey, setBaseURL } = require('./config');
const FunctionManager = require('./function-manager');

class LayerupSecurity {
	constructor(config) {
		const { apiKey, baseURL } = config;

		if (!apiKey) {
			throw new Error(
				'API key is required! Get your API key at https://dashboard.uselayerup.com'
			);
		}

		setAPIKey(apiKey);

		if (baseURL) {
			setBaseURL(baseURL);
		}

		this.functionManager = new FunctionManager();
	}

	async interceptPrompt(messages, metadata) {
		return await this.functionManager.interceptPrompt(messages, metadata);
	}

	async interceptResponse(messages, metadata) {
		return await this.functionManager.interceptResponse(messages, metadata);
	}
}

module.exports = LayerupSecurity;
