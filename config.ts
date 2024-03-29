import { Config } from "./types";

const config: Config = {
	apiKey: '',
	baseURL: 'https://api.uselayerup.com/v1/',
};

// Function to set the API key
export function setAPIKey(key: string): void {
	config.apiKey = key;
}

export function setBaseURL(url: string): void {
	config.baseURL = url;
}

// Function to get the current configuration
export function getConfig(): Config {
	return config;
}