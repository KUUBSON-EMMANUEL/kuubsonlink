'use server';

/**
 * @fileOverview A marketing copy generation AI agent.
 *
 * - generateMarketingCopy - A function that generates marketing copy.
 * - GenerateMarketingCopyInput - The input type for the generateMarketingCopy function.
 * - GenerateMarketingCopyOutput - The return type for the generateMarketingCopy function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateMarketingCopyInputSchema = z.object({
  productName: z.string().describe('The name of the product or service.'),
  description: z.string().describe('A detailed description of the product or service, including its benefits and unique selling points.'),
  targetAudience: z.string().describe('The intended audience for the marketing copy (e.g., young adults, families, professionals).'),
  tone: z.string().describe('The desired tone of the marketing copy (e.g., humorous, professional, enthusiastic).'),
  keywords: z.string().describe('Relevant keywords to include in the marketing copy to improve SEO and relevance.'),
  callToAction: z.string().describe('The desired call to action (e.g., Visit our website, Order now, Learn more).'),
});
export type GenerateMarketingCopyInput = z.infer<typeof GenerateMarketingCopyInputSchema>;

const GenerateMarketingCopyOutputSchema = z.object({
  marketingCopy: z.string().describe('The generated marketing copy.'),
});
export type GenerateMarketingCopyOutput = z.infer<typeof GenerateMarketingCopyOutputSchema>;

export async function generateMarketingCopy(input: GenerateMarketingCopyInput): Promise<GenerateMarketingCopyOutput> {
  return generateMarketingCopyFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateMarketingCopyPrompt',
  input: {schema: GenerateMarketingCopyInputSchema},
  output: {schema: GenerateMarketingCopyOutputSchema},
  prompt: `You are a marketing expert specializing in writing engaging and effective marketing copy.

  Based on the provided information, create compelling marketing copy that will attract new customers.

  Product/Service Name: {{{productName}}}
  Description: {{{description}}}
  Target Audience: {{{targetAudience}}}
  Tone: {{{tone}}}
  Keywords: {{{keywords}}}
  Call to Action: {{{callToAction}}}

  Marketing Copy:`,
});

const generateMarketingCopyFlow = ai.defineFlow(
  {
    name: 'generateMarketingCopyFlow',
    inputSchema: GenerateMarketingCopyInputSchema,
    outputSchema: GenerateMarketingCopyOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
