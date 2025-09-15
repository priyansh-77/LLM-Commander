'use server';

/**
 * @fileOverview Optimizes a raw prompt using AI-powered prompt engineering techniques for improved LLM responses.
 *
 * - optimizePrompt - A function that optimizes the prompt.
 * - OptimizePromptInput - The input type for the optimizePrompt function.
 * - OptimizePromptOutput - The return type for the optimizePrompt function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const OptimizePromptInputSchema = z.object({
  rawPrompt: z.string().describe('The raw natural language prompt to be optimized.'),
});
export type OptimizePromptInput = z.infer<typeof OptimizePromptInputSchema>;

const OptimizePromptOutputSchema = z.object({
  optimizedPrompt: z.string().describe('The optimized prompt for improved LLM responses.'),
});
export type OptimizePromptOutput = z.infer<typeof OptimizePromptOutputSchema>;

export async function optimizePrompt(input: OptimizePromptInput): Promise<OptimizePromptOutput> {
  return optimizePromptFlow(input);
}

const prompt = ai.definePrompt({
  name: 'optimizePromptPrompt',
  input: {schema: OptimizePromptInputSchema},
  output: {schema: OptimizePromptOutputSchema},
  prompt: `You are an expert prompt engineer. Your goal is to refine the user's raw prompt to be more effective for large language models.
Apply prompt engineering techniques such as adding explicit instructions, providing examples, and structuring the format.

Raw Prompt: {{{rawPrompt}}}

Optimized Prompt:`,
});

const optimizePromptFlow = ai.defineFlow(
  {
    name: 'optimizePromptFlow',
    inputSchema: OptimizePromptInputSchema,
    outputSchema: OptimizePromptOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
