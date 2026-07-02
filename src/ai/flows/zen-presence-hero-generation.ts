'use server';
/**
 * @fileOverview A Genkit flow for generating daily meditative sumi-e ink art and a growth-focused quote.
 *
 * - zenPresenceHeroGeneration - A function that orchestrates the generation of a daily hero section.
 * - ZenPresenceHeroGenerationInput - The input type for the zenPresenceHeroGeneration function.
 * - ZenPresenceHeroGenerationOutput - The return type for the zenPresenceHeroGeneration function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ZenPresenceHeroGenerationInputSchema = z.object({
  productivitySummary: z
    .string()
    .describe("A summary of the user's recent work patterns and productivity trends."),
  currentDate: z
    .string()
    .describe('The current date in YYYY-MM-DD format, used to ensure daily uniqueness for the quote.'),
});
export type ZenPresenceHeroGenerationInput = z.infer<
  typeof ZenPresenceHeroGenerationInputSchema
>;

const ZenPresenceHeroGenerationOutputSchema = z.object({
  sumiEArt: z.string().describe('A data URI of the AI-generated sumi-e ink art image.'),
  quote: z.string().describe('A growth-focused quote relevant to the user\'s productivity.'),
});
export type ZenPresenceHeroGenerationOutput = z.infer<
  typeof ZenPresenceHeroGenerationOutputSchema
>;

const generateQuotePrompt = ai.definePrompt({
  name: 'generateQuotePrompt',
  input: { schema: ZenPresenceHeroGenerationInputSchema },
  output: { schema: z.object({ quote: z.string() }) },
  prompt: `You are an inspirational zen master providing daily wisdom for a developer's dashboard.
Based on the user's recent productivity trends summarized as: "{{{productivitySummary}}}", and considering the current date: {{{currentDate}}},
generate a unique, short, growth-focused quote that inspires calm, progress, and continuous improvement.
The quote should be reflective, encouraging, and avoid being overly prescriptive or direct. The quote must be different each day.
Only provide the quote, without any additional text or formatting.`,
});

const zenPresenceHeroGenerationFlow = ai.defineFlow(
  {
    name: 'zenPresenceHeroGenerationFlow',
    inputSchema: ZenPresenceHeroGenerationInputSchema,
    outputSchema: ZenPresenceHeroGenerationOutputSchema,
  },
  async (input) => {
    // Generate a growth-focused quote based on productivity trends and current date
    const { output: quoteOutput } = await generateQuotePrompt(input);

    // Generate a sumi-e ink art image
    const { media: sumiEArtMedia } = await ai.generate({
      model: 'googleai/imagen-4.0-fast-generate-001',
      prompt: `Generate a serene, minimalist Japanese sumi-e ink painting. The painting should feature abstract mountains, a soft watercolor texture, subtle ink splashes, and elegant brush strokes. Include an imperfect Zen Enso circle, a few tiny flying birds, and a very subtle, small red sun. Emphasize vast negative space to create a calm, handcrafted, and editorial feel. The color palette should be primarily black ink with muted, soft tones, avoiding any vibrant or bright colors.`,
      config: {
        safetySettings: [
          {
            category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
            threshold: 'BLOCK_NONE',
          },
        ],
      },
    });

    if (!sumiEArtMedia || sumiEArtMedia.length === 0 || !sumiEArtMedia[0].url) {
      throw new Error('Failed to generate sumi-e art image or image URL is missing.');
    }

    return {
      sumiEArt: sumiEArtMedia[0].url,
      quote: quoteOutput!.quote,
    };
  }
);

export async function zenPresenceHeroGeneration(
  input: ZenPresenceHeroGenerationInput
): Promise<ZenPresenceHeroGenerationOutput> {
  return zenPresenceHeroGenerationFlow(input);
}
