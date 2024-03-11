import { ZodLocalStorage } from 'zod-localstorage';

import { TasksSchema } from 'types/tasks';

const LocalStorageKeys = {
  TASKS: TasksSchema,
};

export const Storage = new ZodLocalStorage(LocalStorageKeys);
