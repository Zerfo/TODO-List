import { Storage } from 'utils/loclaStorage';

import { Task } from 'types/tasks';

function getTasksFromLS(): Task[] | null {
  const validationResult = Storage.getItem('TASKS');

  console.log(validationResult);

  return validationResult.success ? validationResult.data : null;
}

export default getTasksFromLS;
