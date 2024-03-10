import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import logger from 'redux-logger';

import tasks from './tasks/slice';

const middlewares: any[] = [];

if (process.env.LOCAL_DEV !== 'false' || !process.env.LOCAL_DEV) {
  middlewares.push(logger);
}

export const store = configureStore({
  reducer: {
    tasks,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middlewares),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
