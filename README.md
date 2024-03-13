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

### Mask Prompts

Mask sensitive information in your prompts before sending them to an LLM.

```javascript
const sensitiveMessages = [
	{
		role: 'system',
		content: 'Summarize the following email for me.',
	},
	{
		role: 'user',
		content:
			'Dear Mr. Smith, hope you are doing well. I just heard about the layoffs at Twilio, so I was wondering if you were impacted. Can you please call me back at your earliest convenience? My number is (123) 456-7890. Best Regards, Bob Dylan',
	},
];

// Make the call to Layerup
let [messages, unmaskResponse] = await layerup.maskPrompt(sensitiveMessages);

// Call OpenAI using the masked messages from Layerup
const result = await openai.chat.completions.create({
	messages,
	model: 'gpt-3.5-turbo',
});

// Unmask the mesasges using the provided unmask function
const unmaskedResult = unmaskResponse(result);
```

### Log Errors

Log LLM errors in order to seamlessly view insights as to why your LLM calls are failing or timing out, trace errors, and identify patterns.

```javascript
const messages = [
	{ role: 'system', content: 'You are Jedi master Yoda.' },
	{ role: 'user', content: "What is Luke Skywalker's favorite fruit?" },
];

try {
	// Send your request
	await openai.chat.completions.create({
		messages,
		model: 'gpt-3.5-turbo',
	});
} catch (error) {
	// Log error using Layerup error logging
	layerup.logError(error, messages);
}
```

### Execute Rules

Execute pre-defined rules that allow you to send canned responses when a user prompts in a certain way, adding yet another layer of protection to your LLM calls.

```javascript
const messages = [
	{
		role: 'system',
		content: 'You answer questions about your fictional company.',
	},
	{
		role: 'user',
		content: 'Can I get a 15% discount?',
	},
];

// Make the call to Layerup
let securityResponse = await layerup.executeRules(
	['layerup.security.prompt.discount'],
	messages
);

if (!securityResponse.all_safe) {
	// Use canned response for your LLM call
	console.log(securityResponse.canned_response);
} else {
	// Continue with your LLM call
	const result = await openai.chat.completions.create({
		messages,
		model: 'gpt-3.5-turbo',
	});
}
```
