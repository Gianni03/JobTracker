'use server';
/**
 * @fileOverview This file defines a Genkit flow for analyzing recruiter feedback.
 *
 * analyzeRecruiterFeedback - Analyzes feedback from recruiters to identify areas for improvement and suggest personalized improvements.
 * AnalyzeRecruiterFeedbackInput - The input type for the analyzeRecruiterFeedback function.
 * AnalyzeRecruiterFeedbackOutput - The output type for the analyzeRecruiterFeedback function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeRecruiterFeedbackInputSchema = z.object({
  feedback: z
    .string()
    .describe('The feedback received from the recruiter.'),
});

export type AnalyzeRecruiterFeedbackInput = z.infer<
  typeof AnalyzeRecruiterFeedbackInputSchema
>;

const AnalyzeRecruiterFeedbackOutputSchema = z.object({
  areasForImprovement: z
    .string()
    .describe('Key areas where the candidate can improve.'),
  personalizedSuggestions: z
    .string()
    .describe('Personalized suggestions for improvement.'),
});

export type AnalyzeRecruiterFeedbackOutput = z.infer<
  typeof AnalyzeRecruiterFeedbackOutputSchema
>;

export async function analyzeRecruiterFeedback(
  input: AnalyzeRecruiterFeedbackInput
): Promise<AnalyzeRecruiterFeedbackOutput> {
  return analyzeRecruiterFeedbackFlow(input);
}

const analyzeRecruiterFeedbackPrompt = ai.definePrompt({
  name: 'analyzeRecruiterFeedbackPrompt',
  input: {schema: AnalyzeRecruiterFeedbackInputSchema},
  output: {schema: AnalyzeRecruiterFeedbackOutputSchema},
  prompt: `You are an AI assistant designed to analyze feedback from recruiters and provide personalized suggestions for improvement.
  Analyze the following feedback and identify key areas for improvement and generate personalized suggestions.
  \n  Feedback: {{{feedback}}}
  \n  Respond in a format that is easily readable.
  Areas for Improvement:
  - ...
  \n  Personalized Suggestions:
  - ...`,
});

const analyzeRecruiterFeedbackFlow = ai.defineFlow(
  {
    name: 'analyzeRecruiterFeedbackFlow',
    inputSchema: AnalyzeRecruiterFeedbackInputSchema,
    outputSchema: AnalyzeRecruiterFeedbackOutputSchema,
  },
  async input => {
    const {output} = await analyzeRecruiterFeedbackPrompt(input);
    return output!;
  }
);
