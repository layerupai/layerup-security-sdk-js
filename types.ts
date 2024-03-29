import { ChatCompletionMessageParam } from "openai/resources";

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
} | ChatCompletionMessageParam;

export type GuardrailResponse = {
  all_safe: boolean;
  offending_guardrail?: string;
  canned_response?: LLMMessage;
}