import { memo, useEffect } from 'react';

import Block from 'components/Block';
import Divider from 'components/Divider';
import Text from 'components/Text';
import Title from 'components/Title';

import { useAppDispatch } from 'store';
import { useTasks } from 'store/tasks/hooks';
import { fetchTasks } from 'store/tasks/thunks';

import emptyImage from 'assets/images/empty-data.png';

import styles from './App.module.scss';

function App() {
  const dispatch = useAppDispatch();

  const tasks = useTasks();

  useEffect(() => {
    dispatch(fetchTasks());
  }, []);

  return (
    <div className={styles.app}>
      <Block className={styles.wrapper}>
        <Title level={3}>My Tasks</Title>
        <Divider />

        {(!tasks || tasks.length === 0) && (
          <div className={styles.emptyWrapper}>
            <img src={emptyImage} alt="empty" className={styles.emptyImage} />
            <Text type="default">No data</Text>
          </div>
        )}
      </Block>
    </div>
  );
}

export default memo(App);
