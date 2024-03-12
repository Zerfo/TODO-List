import {
  ChangeEvent, memo, useCallback, useEffect, useState,
} from 'react';

import Text from 'components/Text';

import { useAppDispatch } from 'store';
import { fetchChangeTask, fetchRemoveTask } from 'store/tasks/thunks';

import { Task } from 'types/tasks';

import closeIcon from 'assets/icons/close-icon.png';
import editIcon from 'assets/icons/edit-icon.png';
import removeIcon from 'assets/icons/remove-icon.png';
import saveIcon from 'assets/icons/save-icon.png';

import styles from './TodoItem.module.scss';

type TLocalTask = Pick<Task, 'title' | 'isCompleted'>;

function TodoItem(task: Task) {
  const { title, isCompleted, id } = task;

  const dispatch = useAppDispatch();

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [localTask, setLocalTask] = useState<TLocalTask | null>();

  const onRemoveTask = useCallback(
    () => dispatch(fetchRemoveTask({ id })),
    [id],
  );

  const onCompleteTask = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(fetchChangeTask({ id, isCompleted: e.target.checked }));
    },
    [id],
  );

  const onChangeTask = useCallback(
    () => {
      dispatch(fetchChangeTask({ ...localTask, id }));
      setIsEdit(false);
    },
    [task, localTask],
  );

  const onChangeTaskTitle = useCallback((value: string) => setLocalTask(
    (state) => ({
      isCompleted: state?.isCompleted || isCompleted,
      title: value,
    }),
  ), [task, localTask]);

  const onChangeTaskIsCompleted = useCallback(
    (value: boolean) => setLocalTask((state) => ({
      ...state,
      isCompleted: value,
      title: state?.title || title,
    })),
    [task, localTask],
  );

  useEffect(
    () => setLocalTask({
      title,
      isCompleted,
    }),
    [task],
  );

  return (
    <div className={styles.wrapper}>
      {isEdit ? (
        <>
          <input
            type="checkbox"
            className={styles.checkbox}
            checked={localTask?.isCompleted}
            onChange={(e) => onChangeTaskIsCompleted(e.target.checked)}
          />

          <input
            type="text"
            className={styles.input}
            value={localTask?.title}
            onChange={(e) => onChangeTaskTitle(e.target.value)}
          />
        </>
      ) : (
        <>
          <input
            type="checkbox"
            className={styles.checkbox}
            checked={isCompleted}
            onChange={onCompleteTask}
          />

          <Text type={isCompleted ? 'delete' : 'default'} className={styles.text}>{title}</Text>
        </>
      )}

      {isEdit ? (
        <div className={styles.btns}>
          <button type="button" className={styles.btn} onClick={onChangeTask}>
            <img src={saveIcon} alt="edit" className={styles.btnIcon} />
          </button>

          <button
            type="button"
            className={styles.btn}
            onClick={() => setIsEdit(false)}
          >
            <img src={closeIcon} alt="remove" className={styles.btnIcon} />
          </button>
        </div>
      ) : (
        <div className={styles.btns}>
          <button
            type="button"
            className={styles.btn}
            onClick={() => setIsEdit(true)}
          >
            <img src={editIcon} alt="edit" className={styles.btnIcon} />
          </button>

          <button type="button" className={styles.btn} onClick={onRemoveTask}>
            <img src={removeIcon} alt="remove" className={styles.btnIcon} />
          </button>
        </div>
      )}
    </div>
  );
}

export default memo(TodoItem);
