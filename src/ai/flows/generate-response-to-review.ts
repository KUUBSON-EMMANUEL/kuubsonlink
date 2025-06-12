'use server';
/**
 * @fileOverview An AI agent for generating responses to customer reviews.
 *
 * - generateResponseToReview - A function that generates a response to a customer review.
 * - GenerateResponseToReviewInput - The input type for the generateResponseToReview function.
 * - GenerateResponseToReviewOutput - The return type for the generateResponseToReview function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateResponseToReviewInputSchema = z.object({
  reviewText: z.string().describe('The text of the customer review.'),
  vendorName: z.string().describe('The name of the vendor receiving the review.'),
  customerName: z.string().describe('The name of the customer who wrote the review.'),
  existingResponse: z.string().optional().describe('The existing response to the review, if any.'),
});
export type GenerateResponseToReviewInput = z.infer<typeof GenerateResponseToReviewInputSchema>;

const GenerateResponseToReviewOutputSchema = z.object({
  response: z.string().describe('The generated response to the customer review.'),
});
export type GenerateResponseToReviewOutput = z.infer<typeof GenerateResponseToReviewOutputSchema>;

export async function generateResponseToReview(input: GenerateResponseToReviewInput): Promise<GenerateResponseToReviewOutput> {
  return generateResponseToReviewFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateResponseToReviewPrompt',
  input: {schema: GenerateResponseToReviewInputSchema},
  output: {schema: GenerateResponseToReviewOutputSchema},
  prompt: `You are a customer service expert helping [[vendorName]] respond to a customer review written by [[customerName]].

  Review Text: [[reviewText]]

  {% if existingResponse %}
  Here is the existing response to the review:
  [[existingResponse]]
  Your goal is to improve upon it.
  {% else %}
  Your goal is to write a thoughtful and professional response.
  {% endif %}

  Be polite and professional. Acknowledge the customer's points, and offer solutions where possible.
  The generated response should be concise and engaging, no more than 100 words.
  Response: `,
});

const generateResponseToReviewFlow = ai.defineFlow(
  {
    name: 'generateResponseToReviewFlow',
    inputSchema: GenerateResponseToReviewInputSchema,
    outputSchema: GenerateResponseToReviewOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
