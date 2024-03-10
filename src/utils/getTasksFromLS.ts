import { Task, TasksSchema } from 'types/tasks';

function getTasksFromLS(): Task[] | null {
  const data = localStorage.getItem('tasks');

  if (data) {
    return TasksSchema.parse(data);
  }

  return null;
}

export default getTasksFromLS;
