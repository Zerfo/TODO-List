import { createSlice } from '@reduxjs/toolkit';

import {
  fetchAddTask,
  fetchChangeTask,
  fetchRemoveTask,
  fetchTasks,
} from './thunks';
import { TasksSlice } from './types';

const initialState: TasksSlice = {
  tasks: null,
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
      })
      .addCase(fetchAddTask.fulfilled, (state, action) => {
        state.tasks = action.payload;
      })
      .addCase(fetchChangeTask.fulfilled, (state, action) => {
        state.tasks = action.payload;
      })
      .addCase(fetchRemoveTask.fulfilled, (state, action) => {
        state.tasks = action.payload;
      });
  },
});

export default tasksSlice.reducer;
