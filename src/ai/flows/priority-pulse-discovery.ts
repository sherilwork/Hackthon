'use server';
/**
 * @fileOverview An AI agent that analyzes a developer's tasks and projects to identify and highlight the most critical priorities.
 *
 * - priorityPulseDiscovery - A function that handles the priority discovery process.
 * - PriorityPulseDiscoveryInput - The input type for the priorityPulseDiscovery function.
 * - PriorityPulseDiscoveryOutput - The return type for the priorityPulseDiscovery function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TaskSchema = z.object({
  id: z.string().describe('Unique identifier for the task.'),
  name: z.string().describe('The name of the task.'),
  description: z.string().optional().describe('A brief description of the task.'),
  dueDate: z.string().optional().describe('The due date of the task in ISO 8601 format (e.g., YYYY-MM-DD).'),
  status: z.string().describe('The current status of the task (e.g., To Do, In Progress, Blocked, Completed).'),
  priority: z.string().optional().describe('The assigned priority level of the task (e.g., Low, Medium, High, Urgent).'),
  project: z.string().optional().describe('The name of the project this task belongs to.'),
});

const PriorityPulseDiscoveryInputSchema = z.object({
  tasks: z.array(TaskSchema).describe('A list of tasks for the developer.'),
});
export type PriorityPulseDiscoveryInput = z.infer<typeof PriorityPulseDiscoveryInputSchema>;

const CriticalPrioritySchema = z.object({
  id: z.string().describe('The unique identifier of the critical task.'),
  name: z.string().describe('The name of the critical task.'),
  reason: z.string().describe('A brief explanation of why this task is considered critical.'),
  dueDate: z.string().optional().describe('The due date of the critical task, if applicable.'),
  project: z.string().optional().describe('The project the critical task belongs to, if applicable.'),
});

const PriorityPulseDiscoveryOutputSchema = z.object({
  criticalPriorities: z.array(CriticalPrioritySchema).describe('A list of the most critical tasks identified.'),
});
export type PriorityPulseDiscoveryOutput = z.infer<typeof PriorityPulseDiscoveryOutputSchema>;

export async function priorityPulseDiscovery(input: PriorityPulseDiscoveryInput): Promise<PriorityPulseDiscoveryOutput> {
  return priorityPulseDiscoveryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'priorityPulseDiscoveryPrompt',
  input: {schema: PriorityPulseDiscoveryInputSchema},
  output: {schema: PriorityPulseDiscoveryOutputSchema},
  prompt: `You are an expert project manager and productivity coach. Your goal is to help a developer focus on the most impactful work by identifying their critical priorities from a list of tasks.

Analyze the following tasks. For each task, consider its name, description, status, due date, and assigned priority. Identify the 3-5 most critical tasks that require immediate attention or have the highest impact on project goals. Provide a brief reason for why each task is critical.

Return only a JSON object matching the output schema. Do not include any other text or formatting.

Tasks:
{{#each tasks}}
  - ID: {{{id}}}
  - Name: {{{name}}}
  - Description: {{{description}}}
  - Due Date: {{{dueDate}}}
  - Status: {{{status}}}
  - Priority: {{{priority}}}
  - Project: {{{project}}}
{{/each}}`,
});

const priorityPulseDiscoveryFlow = ai.defineFlow(
  {
    name: 'priorityPulseDiscoveryFlow',
    inputSchema: PriorityPulseDiscoveryInputSchema,
    outputSchema: PriorityPulseDiscoveryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    if (!output) {
      throw new Error('Failed to identify critical priorities.');
    }
    return output;
  }
);
