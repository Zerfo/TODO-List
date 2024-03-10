import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

export const tasksSelector = (state: RootState) => state.tasks;

export const tasksDataSelector = createSelector(
  tasksSelector,
  (tasks) => tasks.tasks,
);
