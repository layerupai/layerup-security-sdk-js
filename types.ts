import type { OpenAI } from "openai";

type OpenAICompletionParam = OpenAI.Chat.Completions.ChatCompletionMessageParam;

export interface Config {
	apiKey: string;
	baseURL?: string;
}

export interface MaskedResponse {
	messages: any[];
	variables: { [key: string]: string };
}

export type Metadata = {
  customer?: string;
  scope?: string;
  abuse_config?: {
    project_rpm?: number;
    customer_rpm?: number;
    scope_rpm?: number;
    customer_scope_rpm?: number;
  };
} | null;

export type LLMMessage = {
  role: string;
  content: string;
} | OpenAICompletionParam;

export type GuardrailResponse = {
  all_safe: boolean;
  offending_guardrail?: string;
  canned_response?: LLMMessage;
}