// Default config
const config = {
	apiKey: '',
	baseURL: 'https://api.uselayerup.com/v1/',
};

// Function to set the API key
function setAPIKey(key) {
	config.apiKey = key;
}

function setBaseURL(url) {
	config.baseURL = url;
}

// Function to get the current configuration
function getConfig() {
	return config;
}

module.exports = {
	setAPIKey,
	setBaseURL,
	getConfig,
};
