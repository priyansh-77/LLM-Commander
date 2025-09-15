import type { LLM } from '@/lib/types';
import OpenAiIcon from '@/components/icons/openai-icon';
import ClaudeIcon from '@/components/icons/claude-icon';
import GeminiIcon from '@/components/icons/gemini-icon';

export const AVAILABLE_LLMS: LLM[] = [
  {
    id: 'gemini',
    name: 'Gemini',
    Icon: GeminiIcon,
  },
  {
    id: 'openai',
    name: 'OpenAI',
    Icon: OpenAiIcon,
  },
  {
    id: 'claude',
    name: 'Claude',
    Icon: ClaudeIcon,
  },
];
