import {
  ChangeEvent, memo, useCallback, useEffect, useState,
} from 'react';

import IconButton from 'components/IconButton';
import Text from 'components/Text';

import { useAppDispatch } from 'store';
import { fetchChangeTask, fetchRemoveTask } from 'store/tasks/thunks';

import { Task } from 'types/tasks';

import CloseIcon from 'assets/icons/close-icon.svg';
import EditIcon from 'assets/icons/edit-icon.svg';
import RemoveIcon from 'assets/icons/remove-icon.svg';
import SaveIcon from 'assets/icons/save-icon.svg';

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

          <Text
            type={isCompleted ? 'delete' : 'default'}
            className={styles.text}
          >
            {title}
          </Text>
        </>
      )}

      {isEdit ? (
        <div className={styles.btns}>
          <IconButton
            className={styles.btn}
            icon={<SaveIcon />}
            onClick={onChangeTask}
          />

          <IconButton
            className={styles.btn}
            icon={<CloseIcon />}
            onClick={() => setIsEdit(false)}
          />
        </div>
      ) : (
        <div className={styles.btns}>
          <IconButton
            className={styles.btn}
            icon={<EditIcon />}
            onClick={() => setIsEdit(true)}
          />

          <IconButton
            className={styles.btn}
            icon={<RemoveIcon />}
            onClick={onRemoveTask}
          />
        </div>
      )}
    </div>
  );
}

export default memo(TodoItem);
