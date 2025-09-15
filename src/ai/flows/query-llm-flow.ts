'use server';

/**
 * @fileOverview Queries a specified LLM with a given prompt.
 *
 * - queryLlm - A function that queries the LLM.
 * - QueryLlmInput - The input type for the queryLlm function.
 * - QueryLlmOutput - The return type for the queryLlm function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const QueryLlmInputSchema = z.object({
  llmId: z.string().describe('The ID of the LLM to query.'),
  prompt: z.string().describe('The prompt to send to the LLM.'),
  apiKey: z.string().optional().describe('The API key for the LLM.'),
  temperature: z.number().optional().describe('The temperature for the LLM.'),
});
export type QueryLlmInput = z.infer<typeof QueryLlmInputSchema>;

const QueryLlmOutputSchema = z.object({
  response: z.string().describe('The response from the LLM.'),
});
export type QueryLlmOutput = z.infer<typeof QueryLlmOutputSchema>;

export async function queryLlm(input: QueryLlmInput): Promise<QueryLlmOutput> {
  return queryLlmFlow(input);
}

const queryLlmFlow = ai.defineFlow(
  {
    name: 'queryLlmFlow',
    inputSchema: QueryLlmInputSchema,
    outputSchema: QueryLlmOutputSchema,
  },
  async input => {
    if (
      !input.apiKey &&
      (input.llmId === 'openai' || input.llmId === 'claude')
    ) {
      throw new Error(
        `API key for ${input.llmId} is missing. Please add it in settings.`
      );
    }

    let model;
    switch (input.llmId) {
      case 'gemini':
        model = 'googleai/gemini-2.5-flash';
        break;
      case 'openai':
        // As we are only using Gemini, we'll map OpenAI to it.
        model = 'googleai/gemini-2.5-flash';
        break;
      case 'claude':
        // As we are only using Gemini, we'll map Claude to it.
        model = 'googleai/gemini-2.5-flash';
        break;
      default:
        throw new Error(`Unsupported model: ${input.llmId}`);
    }
    
    const {text} = await ai.generate({
        model: model,
        prompt: input.prompt,
        config: {
            temperature: input.temperature,
        }
    });

    return {response: text};
  }
);
