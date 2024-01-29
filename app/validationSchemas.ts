import { z } from 'zod';

export const createIssueSchema = z.object({
    title: z.string().min(1, 'Title is required!').max(255, 'No longer than 255 characters!'),
    description: z.string().min(1, 'Description is required!').max(2500, "No longer than 2500 characters!"),
});

export const updateIssueSchema = z.object({
    title: z.string().min(1, 'Title is required!').max(255, 'No longer than 255 characters!'),
    description: z.string().min(1, 'Description is required!').max(2500, "No longer than 2500 characters!"),
})