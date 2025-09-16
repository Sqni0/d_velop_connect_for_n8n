import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import {
  DvelopActionDefinition,
  DvelopEventDefinition,
  DvelopAuthConfig
} from '../types';

/**
 * API Client for d.velop Actions App
 * Handles authentication and API calls to discover actions and events
 */
export class DvelopActionsApiClient {
  private client: AxiosInstance;
  private config: DvelopAuthConfig;

  constructor(config: DvelopAuthConfig) {
    this.config = config;
    this.client = axios.create({
      baseURL: `${config.baseUrl}/actions`,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    // Request interceptor for authentication
    this.client.interceptors.request.use((config) => {
      if (this.config.bearerToken) {
        config.headers.Authorization = `Bearer ${this.config.bearerToken}`;
      }

      if (this.config.cookieAuth) {
        config.headers.Cookie = `AuthSessionId=${this.config.cookieAuth}`;
      }

      return config;
    });

    // Response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        console.error('d.velop API Error:', error.response?.data || error.message);
        throw error;
      }
    );
  }

  /**
   * Get all available actions from the d.velop platform
   */
  async getActions(): Promise<DvelopActionDefinition[]> {
    try {
      const response = await this.client.get<DvelopActionDefinition[]>('/api/v1/actions');
      return response.data || [];
    } catch (error) {
      console.error('Failed to fetch actions:', error);
      throw new Error(`Failed to fetch actions: ${error}`);
    }
  }

  /**
   * Get all available event definitions from the d.velop platform
   */
  async getEventDefinitions(): Promise<DvelopEventDefinition[]> {
    try {
      const response = await this.client.get<{ eventDefinitions?: DvelopEventDefinition[]; data?: any }>(
        '/api/v1/event-definitions'
      );
      // API liefert laut Anpassung ein Objekt mit eventDefinitions-Array
      const defs = (response.data as any)?.eventDefinitions;
      if (Array.isArray(defs)) return defs;
      // Fallback: falls legacy direktes Array zurückkommt
      if (Array.isArray(response.data)) return response.data as unknown as DvelopEventDefinition[];
      return [];
    } catch (error) {
      console.error('Failed to fetch event definitions:', error);
      throw new Error(`Failed to fetch event definitions: ${error}`);
    }
  }

  /**
   * Get a specific action by ID
   */
  async getAction(actionId: string): Promise<DvelopActionDefinition | null> {
    try {
      const response = await this.client.get<DvelopActionDefinition>(`/api/v1/actions/${actionId}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return null;
      }
      console.error(`Failed to fetch action ${actionId}:`, error);
      throw new Error(`Failed to fetch action ${actionId}: ${error}`);
    }
  }

  /**
   * Get a specific event definition by ID
   */
  async getEventDefinition(eventId: string): Promise<DvelopEventDefinition | null> {
    try {
      const response = await this.client.get<DvelopEventDefinition>(`/api/v1/event-definitions/${eventId}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return null;
      }
      console.error(`Failed to fetch event definition ${eventId}:`, error);
      throw new Error(`Failed to fetch event definition ${eventId}: ${error}`);
    }
  }

  /**
   * Refresh event definitions from all registered apps
   */
  async refreshEventDefinitions(): Promise<void> {
    try {
      await this.client.post('/api/v1/event-definitions/refresh');
    } catch (error) {
      console.error('Failed to refresh event definitions:', error);
      throw new Error(`Failed to refresh event definitions: ${error}`);
    }
  }

  /**
   * Validate an event definition
   */
  async validateEventDefinition(eventDefinition: DvelopEventDefinition): Promise<boolean> {
    try {
      await this.client.post('/api/v1/event-definitions/validate', eventDefinition);
      return true;
    } catch (error) {
      console.error('Event definition validation failed:', error);
      return false;
    }
  }

  /**
   * Execute an event (for testing purposes)
   */
  async executeEvent(eventId: string, eventData: Record<string, any>): Promise<void> {
    try {
      await this.client.post('/api/v1/events/execute', {
        eventDefinitionId: eventId,
        data: eventData
      });
    } catch (error) {
      console.error(`Failed to execute event ${eventId}:`, error);
      throw new Error(`Failed to execute event ${eventId}: ${error}`);
    }
  }

  /**
   * Get dynamic value set data from a URL
   */
  async getDynamicValueSet(url: string, queryParams?: Record<string, any>): Promise<any[]> {
    try {
      const config: AxiosRequestConfig = {
        params: queryParams
      };

      const response = await this.client.get(url, config);
      return response.data.values || response.data || [];
    } catch (error) {
      console.error(`Failed to fetch dynamic value set from ${url}:`, error);
      throw new Error(`Failed to fetch dynamic value set: ${error}`);
    }
  }

  /**
   * Test connection to the d.velop platform
   */
  async testConnection(): Promise<boolean> {
    try {
      await this.client.get('/api/v1/actions', {
        timeout: 5000,
        params: { limit: 1 }
      });
      return true;
    } catch (error) {
      console.error('Connection test failed:', error);
      return false;
    }
  }
}
