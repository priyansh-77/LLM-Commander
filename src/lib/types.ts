import type { LucideIcon } from 'lucide-react';

export interface LLM {
  id: 'gemini' | 'openai' | 'claude';
  name: string;
  Icon: LucideIcon | ((props: any) => JSX.Element);
}

export interface ApiKeys {
  gemini: string;
  openai: string;
  claude: string;
}

export interface LlmResponse {
  llmId: string;
  response: string;
  error?: string;
}

export interface QueryLlmResponse {
  response: string;
}
