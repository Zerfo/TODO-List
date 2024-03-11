import {
  KeyboardEvent, memo, useCallback, useState,
} from 'react';

import { useAppDispatch } from 'store';
import { fetchAddTask } from 'store/tasks/thunks';

import sendIcon from 'assets/icons/send-icon.png';

import styles from './AddTask.module.scss';

type TProps = {
	placeholder: string;
};

function AddTask(props: TProps) {
  const { placeholder } = props;

  const dispatch = useAppDispatch();

  const [text, setText] = useState<string>('');

  const onAddTask = useCallback(() => {
    const title = text.trim();

    if (title.length > 0) {
      dispatch(fetchAddTask({ title }));
    }
  }, [text]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      const title = text.trim();

      if (e.key === 'Enter' && title.length > 0) {
        dispatch(fetchAddTask({ title }));
      }
    },
    [text],
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.inputWrapper}>
        <input
          type="text"
          autoComplete="off"
          required
          id="input"
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <label htmlFor="input">{placeholder}</label>
      </div>

      <button
        type="button"
        onClick={onAddTask}
        className={styles.btn}
      >
        <img src={sendIcon} alt="send" className={styles.btnIcon} />
      </button>
    </div>
  );
}

export default memo(AddTask);
