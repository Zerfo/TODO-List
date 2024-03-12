import {
  ReactNode, memo, useEffect, useMemo,
} from 'react';

import AddTask from 'components/AddTask';
import Block from 'components/Block';
import Divider from 'components/Divider';
import Text from 'components/Text';
import Title from 'components/Title';

import { useAppDispatch } from 'store';
import { useTasks } from 'store/tasks/hooks';
import { fetchTasks } from 'store/tasks/thunks';

import emptyImage from 'assets/images/empty-data.png';

import TodoItem from 'components/TodoItem';
import styles from './App.module.scss';

function App() {
  const dispatch = useAppDispatch();

  const tasks = useTasks();

  const isEmptyTasks = useMemo<boolean>(
    () => !tasks || tasks.length === 0,
    [tasks],
  );

  const EmptyTasks = useMemo<ReactNode>(() => {
    if (!isEmptyTasks) return null;

    return (
      <div className={styles.emptyWrapper}>
        <img src={emptyImage} alt="empty" className={styles.emptyImage} />
        <Text type="default">No data</Text>
      </div>
    );
  }, [isEmptyTasks]);

  useEffect(() => {
    dispatch(fetchTasks());
  }, []);

  return (
    <div className={styles.app}>
      <Block className={styles.wrapper}>
        <Title level={3}>My Tasks</Title>
        <Divider />

        <AddTask placeholder="Your task" />

        <div className={styles.todoList}>
          {tasks?.map((task) => (
            <TodoItem key={task.id} {...task} />
          ))}
        </div>

        {EmptyTasks}
      </Block>
    </div>
  );
}

export default memo(App);
