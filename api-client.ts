import axios, { AxiosInstance } from 'axios';
import { getConfig } from './config';

interface RequestParams {
  method: string;
  url: string;
  data?: any;
}

class APIClient {
  private client: AxiosInstance;

  constructor() {
    const { baseURL, apiKey } = getConfig();
    if (!apiKey) {
      throw new Error(
        'API key is not set. Please set the API key before using the SDK.'
      );
    }

    this.client = axios.create({
      baseURL: baseURL,
      headers: {
        'Layerup-API-Key': apiKey,
        'Content-Type': 'application/json',
      },
    });
  }

  async request({ method, url, data = {} }: RequestParams): Promise<any> {
    const response = await this.client({
      method,
      url,
      data,
    });
    return response.data;
  }
}

export default APIClient;
