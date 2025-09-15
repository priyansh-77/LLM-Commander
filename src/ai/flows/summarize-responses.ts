'use server';

/**
 * @fileOverview Summarizes responses from multiple LLMs for quick understanding.
 *
 * - summarizeResponses - A function that summarizes LLM responses.
 * - SummarizeResponsesInput - The input type for the summarizeResponses function.
 * - SummarizeResponsesOutput - The return type for the summarizeResponses function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const SummarizeResponsesInputSchema = z.object({
  responses: z
    .array(z.string())
    .describe('An array of responses from different LLMs.'),
});
export type SummarizeResponsesInput = z.infer<typeof SummarizeResponsesInputSchema>;

const SummarizeResponsesOutputSchema = z.object({
  summaries: z
    .array(z.string())
    .describe('An array of summaries, one for each LLM response.'),
});
export type SummarizeResponsesOutput = z.infer<typeof SummarizeResponsesOutputSchema>;

export async function summarizeResponses(
  input: SummarizeResponsesInput
): Promise<SummarizeResponsesOutput> {
  return summarizeResponsesFlow(input);
}

const summarizeResponsesPrompt = ai.definePrompt({
  name: 'summarizeResponsesPrompt',
  input: {schema: SummarizeResponsesInputSchema},
  output: {
    schema: z.object({
      summaries: z.array(z.string()),
    }),
  },
  prompt: `You are an expert summarizer. Given the following LLM responses, create a short summary for each, highlighting the main points. The summaries should be concise and easy to understand.

Responses:
{{#each responses}}
  - {{{this}}}
{{/each}}
`,
});

const summarizeResponsesFlow = ai.defineFlow(
  {
    name: 'summarizeResponsesFlow',
    inputSchema: SummarizeResponsesInputSchema,
    outputSchema: SummarizeResponsesOutputSchema,
  },
  async input => {
    const {output} = await summarizeResponsesPrompt(input);
    return output!;
  }
);
