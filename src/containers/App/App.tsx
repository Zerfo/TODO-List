import { memo, useEffect } from 'react';

import Block from 'components/Block';
import Divider from 'components/Divider';
import Title from 'components/Title';

import { useAppDispatch } from 'store';
import { fetchTasks } from 'store/tasks/thunks';

import styles from './App.module.scss';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTasks());
  }, []);

  return (
    <div className={styles.app}>
      <Block className={styles.wrapper}>
        <Title level={3}>My Tasks</Title>
        <Divider />
      </Block>
    </div>
  );
}

export default memo(App);
