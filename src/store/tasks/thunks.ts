import { createAsyncThunk } from '@reduxjs/toolkit';

import getTasksFromLS from 'utils/getTasksFromLS';

import {
  AddTaskParams, ChangeTaskParams, RemoveTaskParams, Task,
} from 'types/tasks';

export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  () => {
    return getTasksFromLS();
  },
);

export const fetchAddTask = createAsyncThunk(
  'tasks/fetchAddTask',
  async (params: AddTaskParams) => {
    const oldData = getTasksFromLS();
    let newData = [];
    const newTask = {
      title: params.title,
      created_at: new Date(),
      isCompleted: false,
    } as Task;

    if (!oldData) {
      newTask.id = 0;
      localStorage.addItem('tasks', JSON.stringify([newTask]));
      newData = [newTask];
    } else {
      newTask.id = oldData.length;
      localStorage.addItem('tasks', JSON.stringify([...oldData, newTask]));
      newData = [...oldData, newTask];
    }

    return newData as Task[];
  },
);

export const fetchChangeTask = createAsyncThunk(
  'tasks/fetchChangeTask',
  async (params: ChangeTaskParams) => {
    const oldData = getTasksFromLS() as Task[];

    const newData = oldData.map((task) => (task.id === params.id ? {
      ...task,
      title: params.title,
      isCompleted: params.isCompleted,
    } : task));

    localStorage.setItem('tasks', JSON.stringify(newData));

    return newData as Task[];
  },
);

export const fetchRemoveTask = createAsyncThunk(
  'tasks/fetchRemoveTask',
  async (params: RemoveTaskParams) => {
    const oldData = getTasksFromLS() as Task[];

    const newData = oldData.filter((task) => task.id !== params.id);

    if (newData.length > 0) {
      localStorage.addItem('tasks', JSON.stringify(newData));

      return newData as Task[];
    }

    localStorage.removeItem('tasks');

    return null;
  },
);
