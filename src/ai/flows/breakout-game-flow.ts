
'use server';
/**
 * @fileOverview AI flows for the Breakout game.
 *
 * - generateBreakoutLevel: Generates a brick layout from a text prompt.
 * - getBreakoutCoachTip: Provides a coaching tip for the player.
 * - getBreakoutEndGameMessage: Generates a win/loss message.
 * - generateBreakoutAudio: Converts text to speech for the game.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import wav from 'wav';

// --- 1. Level Generation Flow ---

const BreakoutLevelSchema = z.object({
  layout: z.array(z.array(z.number().min(0).max(1)))
    .length(6, { message: "Layout must have exactly 6 rows." })
    .refine(rows => rows.every(row => row.length === 7), {
      message: "Each row must have exactly 7 columns.",
    }),
});
export type BreakoutLevel = z.infer<typeof BreakoutLevelSchema>;

export async function generateBreakoutLevel(prompt: string): Promise<BreakoutLevel> {
  return generateBreakoutLevelFlow({ prompt });
}

const generateBreakoutLevelFlow = ai.defineFlow(
  {
    name: 'generateBreakoutLevelFlow',
    inputSchema: z.object({ prompt: z.string() }),
    outputSchema: BreakoutLevelSchema,
  },
  async ({ prompt }) => {
    const { output } = await ai.generate({
      prompt: `You are a level designer for a Breakout-style arcade game. Your task is to generate a brick layout based on the user's description. The layout must be a 2D JSON array with exactly 6 rows and 7 columns. Use the number 1 to represent a brick and the number 0 for an empty space. User description: "${prompt}"`,
      config: {
        responseFormat: 'json',
        responseSchema: BreakoutLevelSchema,
      },
    });
    return output!;
  }
);


// --- 2. Coach Tip Flow ---

const CoachTipSchema = z.object({ tip: z.string() });
export type CoachTip = z.infer<typeof CoachTipSchema>;

export async function getBreakoutCoachTip(situation: string): Promise<CoachTip> {
  return getBreakoutCoachTipFlow({ situation });
}

const getBreakoutCoachTipFlow = ai.defineFlow(
  {
    name: 'getBreakoutCoachTipFlow',
    inputSchema: z.object({ situation: z.string() }),
    outputSchema: CoachTipSchema,
  },
  async ({ situation }) => {
    const { output } = await ai.generate({
      prompt: `You are a helpful and encouraging retro arcade game coach. Provide a short, single-sentence tip for a player in a Breakout-style game. Be creative and concise. Don't use quotes. The player's situation: "${situation}"`,
      output: { schema: CoachTipSchema },
    });
    return output!;
  }
);


// --- 3. End Game Message Flow ---

const EndGameMessageSchema = z.object({ message: z.string() });
export type EndGameMessage = z.infer<typeof EndGameMessageSchema>;

export async function getBreakoutEndGameMessage(input: { isWin: boolean; score: number; }): Promise<EndGameMessage> {
  return getBreakoutEndGameMessageFlow(input);
}

const getBreakoutEndGameMessageFlow = ai.defineFlow(
  {
    name: 'getBreakoutEndGameMessageFlow',
    inputSchema: z.object({ isWin: z.boolean(), score: z.number() }),
    outputSchema: EndGameMessageSchema,
  },
  async ({ isWin, score }) => {
    const systemPrompt = isWin
      ? "You are an enthusiastic retro arcade game AI. The player has just won a game of Breakout. Generate a short, celebratory 'You Win!' message. Be creative and funny. Don't use quotes."
      : "You are a sassy and funny retro arcade game AI. The player has lost a game of Breakout. Generate a short, funny 'Game Over' message to encourage them to play again. Don't use quotes.";

    const userPrompt = isWin
      ? `The player won with a final score of ${score}. Give them a winning message.`
      : `The player's final score was ${score}. Give them a game over message.`;

    const { output } = await ai.generate({
      system: systemPrompt,
      prompt: userPrompt,
      output: { schema: EndGameMessageSchema },
    });
    return output!;
  }
);


// --- 4. Text-to-Speech (TTS) Flow ---
async function toWav(pcmData: Buffer, channels = 1, rate = 24000, sampleWidth = 2): Promise<string> {
  return new Promise((resolve, reject) => {
    const writer = new wav.Writer({
      channels,
      sampleRate: rate,
      bitDepth: sampleWidth * 8,
    });

    const bufs: any[] = [];
    writer.on('error', reject);
    writer.on('data', (d) => bufs.push(d));
    writer.on('end', () => resolve(Buffer.concat(bufs).toString('base64')));

    writer.write(pcmData);
    writer.end();
  });
}

export async function generateBreakoutAudio(text: string): Promise<{ media: string }> {
    const { media } = await ai.generate({
      model: 'googleai/gemini-2.5-flash-preview-tts',
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Charon' } },
        },
      },
      prompt: `Say in a retro arcade game voice: ${text}`,
    });

    if (!media) {
      throw new Error('No media returned from TTS model.');
    }

    const audioBuffer = Buffer.from(media.url.substring(media.url.indexOf(',') + 1), 'base64');
    const wavBase64 = await toWav(audioBuffer);
    
    return {
      media: `data:audio/wav;base64,${wavBase64}`,
    };
}
