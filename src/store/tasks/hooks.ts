import { useSelector } from 'react-redux';

import { tasksDataSelector } from './selectors';

export const useTasks = () => useSelector(tasksDataSelector);
