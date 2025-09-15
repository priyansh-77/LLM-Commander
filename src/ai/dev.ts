import { config } from 'dotenv';
config();

import '@/ai/flows/optimize-prompt.ts';
import '@/ai/flows/summarize-responses.ts';
import '@/ai/flows/query-llm-flow.ts';
