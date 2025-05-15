// This file is machine-generated - edit at your own risk!

'use server';

/**
 * @fileOverview An SEO-focused copy rewriting AI agent.
 *
 * - rewriteCopyForSEO - A function that rewrites text for SEO optimization.
 * - RewriteCopyForSEOInput - The input type for the rewriteCopyForSEO function.
 * - RewriteCopyForSEOOutput - The return type for the rewriteCopyForSEO function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RewriteCopyForSEOInputSchema = z.object({
  text: z.string().describe('The text to rewrite for SEO.'),
  keywords: z.string().describe('The keywords to incorporate into the text.'),
});
export type RewriteCopyForSEOInput = z.infer<typeof RewriteCopyForSEOInputSchema>;

const RewriteCopyForSEOOutputSchema = z.object({
  rewrittenText: z.string().describe('The rewritten text with incorporated keywords.'),
});
export type RewriteCopyForSEOOutput = z.infer<typeof RewriteCopyForSEOOutputSchema>;

export async function rewriteCopyForSEO(input: RewriteCopyForSEOInput): Promise<RewriteCopyForSEOOutput> {
  return rewriteCopyForSEOFlow(input);
}

const rewriteCopyForSEOPrompt = ai.definePrompt({
  name: 'rewriteCopyForSEOPrompt',
  input: {schema: RewriteCopyForSEOInputSchema},
  output: {schema: RewriteCopyForSEOOutputSchema},
  prompt: `Rewrite the following text to incorporate the given keywords for improved SEO:

Text: {{{text}}}

Keywords: {{{keywords}}}

Rewritten Text:`, 
});

const rewriteCopyForSEOFlow = ai.defineFlow(
  {
    name: 'rewriteCopyForSEOFlow',
    inputSchema: RewriteCopyForSEOInputSchema,
    outputSchema: RewriteCopyForSEOOutputSchema,
  },
  async input => {
    const {output} = await rewriteCopyForSEOPrompt(input);
    return output!;
  }
);
