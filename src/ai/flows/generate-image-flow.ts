
'use server';
/**
 * @fileOverview An AI image generation flow.
 *
 * - generateImage - A function that handles image generation from a text prompt.
 * - GenerateImageInput - The input type for the generateImage function.
 * - GenerateImageOutput - The return type for the generateImage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateImageInputSchema = z.object({
  prompt: z.string().describe('The text prompt to generate an image from.'),
});
export type GenerateImageInput = z.infer<typeof GenerateImageInputSchema>;

const GenerateImageOutputSchema = z.object({
  imageDataUri: z
    .string()
    .describe(
      "The generated image as a data URI. Expected format: 'data:image/png;base64,<encoded_data>'."
    ),
});
export type GenerateImageOutput = z.infer<typeof GenerateImageOutputSchema>;

export async function generateImage(input: GenerateImageInput): Promise<GenerateImageOutput> {
  return generateImageFlow(input);
}

const generateImageFlow = ai.defineFlow(
  {
    name: 'generateImageFlow',
    inputSchema: GenerateImageInputSchema,
    outputSchema: GenerateImageOutputSchema,
  },
  async (input: GenerateImageInput) => {
    const {media} = await ai.generate({
      model: 'googleai/imagen-3.0-fast-generate-latest',
      prompt: input.prompt,
    });

    if (!media || !media.url) {
      throw new Error('Image generation failed. The AI model did not return any image data. This could be due to safety settings or a temporary issue. Please try a different prompt.');
    }
    
    return { imageDataUri: media.url };
  }
);

