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

	async maskPrompt(messages, metadata) {
		const maskedResponse = await this.functionManager.maskPrompt(
			messages,
			metadata
		);

		const deepCopyObject = (originalObject) => {
			return JSON.parse(JSON.stringify(originalObject));
		};

		const replaceVariables = (string, variables) => {
			Object.keys(variables).forEach((key) => {
				string = string.split(key).join(variables[key]);
			});
			return string;
		};

		const unmaskResponse = (templatedResponse) => {
			// If they provided the OpenAI-formatted object, then unmask the first
			// choice's message content and return a copy of the object.
			if (
				typeof templatedResponse == 'object' &&
				templatedResponse.object == 'chat.completion'
			) {
				const updatedString = replaceVariables(
					templatedResponse.choices[0].message.content,
					maskedResponse.variables
				);
				let unmaskedResult = deepCopyObject(templatedResponse);
				unmaskedResult.choices[0].message.content = updatedString;
				return unmaskedResult;
			}

			// If they provided a raw output string, then unmask a copy of the string
			// and return it.
			else if (typeof templatedResponse == 'string') {
				const unmaskedResult = replaceVariables(
					templatedResponse,
					maskedResponse.variables
				);
				return unmaskedResult;
			}

			// Otherwise, we're not sure how to handle the provided response
			throw new Error(
				'The unmask function takes either a chat.completion OpenAI-schema response, or a raw output string. Do not do any post-processing on the LLM response before calling the unmask function.'
			);
		};

		return [maskedResponse.messages, unmaskResponse];
	}

	async logError(error, messages, metadata) {
		return await this.functionManager.logError(error, messages, metadata);
	}

	async executeGuardrails(guardrails, messages, metadata) {
		return await this.functionManager.executeGuardrails(
			guardrails,
			messages,
			metadata
		);
	}
}

module.exports = LayerupSecurity;
