import { setAPIKey, setBaseURL } from './config';
import { Config, MaskedResponse, Metadata } from './types'
import FunctionManager from './function-manager';

export class LayerupSecurity {
	private functionManager: FunctionManager;

	constructor(config: Config) {
		if (!config) {
			throw new Error(
				'Config is required! Usage: const layerup = new LayerupSecurity({ apiKey: ... })'
			);
		}

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

	async maskPrompt(messages: any[], metadata: Metadata): Promise<[any[], (templatedResponse: any) => any]> {
		const maskedResponse: MaskedResponse = await this.functionManager.maskPrompt(
			messages,
			metadata
		);

		const deepCopyObject = <T>(originalObject: T): T => {
			return JSON.parse(JSON.stringify(originalObject));
		};

		const replaceVariables = (string: string, variables: { [key: string]: string }): string => {
			Object.keys(variables).forEach((key) => {
				string = string.split(key).join(variables[key]);
			});
			return string;
		};

		const unmaskResponse = (templatedResponse: any): any => {
			if (
				typeof templatedResponse === 'object' &&
				templatedResponse.object === 'chat.completion'
			) {
				const updatedString = replaceVariables(
					templatedResponse.choices[0].message.content,
					maskedResponse.variables
				);
				let unmaskedResult: any = deepCopyObject(templatedResponse);
				unmaskedResult.choices[0].message.content = updatedString;
				return unmaskedResult;
			} else if (typeof templatedResponse === 'string') {
				const unmaskedResult = replaceVariables(
					templatedResponse,
					maskedResponse.variables
				);
				return unmaskedResult;
			} else {
				throw new Error(
					'The unmask function takes either a chat.completion OpenAI-schema response, or a raw output string. Do not do any post-processing on the LLM response before calling the unmask function.'
				);
			}
		};

		return [maskedResponse.messages, unmaskResponse];
	}

	async logError(error: any, messages: any[], metadata: Metadata): Promise<any> {
		return await this.functionManager.logError(error, messages, metadata);
	}

	async executeGuardrails(guardrails: string[], messages: any[], metadata: Metadata): Promise<any> {
		return await this.functionManager.executeGuardrails(
			guardrails,
			messages,
			metadata
		);
	}
}

export * from './types'