import APIClient from './api-client';
import { Metadata } from './index';

class FunctionManager {
  private apiClient: APIClient;

  constructor() {
    this.apiClient = new APIClient();
  }

  async maskPrompt(messages: any[], metadata: Metadata): Promise<any> {
    try {
      const response = await this.apiClient.request({
        method: 'post',
        url: '/mask/prompt',
        data: JSON.stringify({ messages, metadata }),
      });
      return response;
    } catch (err: any) {
      return err.response.data;
    }
  }

  async logError(error: any, messages: any[], metadata: Metadata): Promise<any> {
    try {
      const response = await this.apiClient.request({
        method: 'post',
        url: '/log/error',
        data: JSON.stringify({ error, messages, metadata }),
      });
      return response;
    } catch (err: any) {
      return err.response.data;
    }
  }

  async executeGuardrails(guardrails: string[], messages: any[], metadata: Metadata): Promise<any> {
    try {
      const response = await this.apiClient.request({
        method: 'post',
        url: '/guardrails/execute',
        data: JSON.stringify({ guardrails, messages, metadata }),
      });
      return response;
    } catch (err: any) {
      return err.response.data;
    }
  }
}

export default FunctionManager;
