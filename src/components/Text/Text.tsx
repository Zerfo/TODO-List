import { ReactNode, memo, useMemo } from 'react';

import clsx from 'clsx';

import styles from './Text.module.scss';

type TProps = {
	children: ReactNode;
	className?: string;
	type?:
		| 'default'
		| 'secondary'
		| 'success'
		| 'warning'
		| 'danger'
		| 'disabled'
		| 'mark'
		| 'code'
		| 'keyboard'
		| 'underline'
		| 'delete'
		| 'strong'
		| 'italic';
};

function Text(props: TProps) {
  const { className, children, type = 'default' } = props;

  const classNames = useMemo<string>(
    () => clsx(styles.text, className, {
      [styles.secondary]: type === 'secondary',
      [styles.success]: type === 'success',
      [styles.warning]: type === 'warning',
      [styles.danger]: type === 'danger',
      [styles.disabled]: type === 'disabled',
      [styles.mark]: type === 'mark',
      [styles.code]: type === 'code',
      [styles.keyboard]: type === 'keyboard',
      [styles.underline]: type === 'underline',
      [styles.delete]: type === 'delete',
      [styles.strong]: type === 'strong',
      [styles.italic]: type === 'italic',
    }),
    [type, className],
  );

  return <span className={classNames}>{children}</span>;
}

export default memo(Text);
