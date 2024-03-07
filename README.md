# Layerup Security JavaScript SDK

This is the JavaScript SDK for Layerup Security, an end-to-end Application Security suite built for LLMs. Get started by creating an account on [our dashboard](https://dashboard.uselayerup.com) and following the instructions below.

## Getting Started

### Installation

```bash
npm install @layerup/layerup-security
```

### API Key

Grab your API key from [our dashboard](https://dashboard.uselayerup.com) and add it to your project environment as `LAYERUP_API_KEY`.

### Import and Configure

```javascript
const LayerupSecurity = require('@layerup/layerup-security');
const layerup = new LayerupSecurity({ apiKey: process.env.LAYERUP_API_KEY });
```

### Intercept Prompts

Intercept unsafe prompts before they are sent to an LLM.

```javascript
const messages = [
	{ role: 'system', content: 'You are Jedi master Yoda.' },
	{ role: 'user', content: "Anakin's social security number is 123-45-6789." },
];

// Make the call to Layerup
let securityResponse = await layerup.interceptPrompt(messages);

if (!securityResponse.all_safe) {
	throw new Error('Unsafe prompt provided. Aborting...');
} else {
	const result = await openai.chat.completions.create({
		messages,
		model: 'gpt-3.5-turbo',
	});
}
```

### Intercept Responses

Intercept unsafe LLM responses before they get to your users.

```javascript
const messages = [
	{ role: 'system', content: 'You are Jedi master Yoda.' },
	{ role: 'user', content: "What is Luke Skywalker's favorite fruit?" },
];

const result = await openai.chat.completions.create({
	messages,
	model: 'gpt-3.5-turbo',
});
messages.push(result.choices[0].message);

// Make the call to Layerup
let securityResponse = await layerup.interceptResponse(messages);

if (!securityResponse.all_safe) {
	throw new Error('Unsafe response received from OpenAI. Aborting...');
} else {
	console.log('All safe - continuing...');
}
```
