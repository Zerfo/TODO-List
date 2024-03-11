import { createAsyncThunk } from '@reduxjs/toolkit';

import getTasksFromLS from 'utils/getTasksFromLS';
import { Storage } from 'utils/loclaStorage';

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
      created_at: new Date().toTimeString(),
      isCompleted: false,
    } as Task;

    if (!oldData) {
      newTask.id = 0;
      Storage.setItem('TASKS', [newTask]);
      newData = [newTask];
    } else {
      newTask.id = oldData.length;
      Storage.setItem('TASKS', [...oldData, newTask]);
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
      title: params.title || task.title,
      isCompleted: params.isCompleted || task.isCompleted,
    } : task));

    Storage.setItem('TASKS', newData);

    return newData as Task[];
  },
);

export const fetchRemoveTask = createAsyncThunk(
  'tasks/fetchRemoveTask',
  async (params: RemoveTaskParams) => {
    const oldData = getTasksFromLS() as Task[];

    const newData = oldData.filter((task) => task.id !== params.id);

    if (newData.length > 0) {
      Storage.setItem('TASKS', newData);

      return newData as Task[];
    }

    Storage.removeItem('TASKS');

    return null;
  },
);
