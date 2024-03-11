import { z } from 'zod';

export const TaskSchema = z.object({
  id: z.number(),
  title: z.string(),
  created_at: z.string(),
  isCompleted: z.boolean(),
});

export const TasksSchema = z.array(TaskSchema);

export type Task = z.infer<typeof TaskSchema>;

export type AddTaskParams = Pick<Task, 'title'>;

export type ChangeTaskParams = Partial<
	Pick<Task, 'id' | 'title' | 'isCompleted'>
>;

export type RemoveTaskParams = Pick<Task, 'id'>;
