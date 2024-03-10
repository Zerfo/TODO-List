import { memo } from 'react';

import clsx from 'clsx';

import styles from './Divider.module.scss';

type TProps = {
	className?: string;
	margin?: number;
	type?: 'vertical' | 'horizontal';
};

function Divider(props: TProps) {
  const { className, margin = 16, type = 'horizontal' } = props;

  switch (type) {
    case 'vertical':
      return (
        <div
          className={clsx(styles.divider, styles.vertical, className)}
          style={{ margin: `0 ${margin}px` }}
        />
      );
    case 'horizontal':
    default:
      return (
        <div
          className={clsx(styles.divider, styles.horizontal, className)}
          style={{ margin: `${margin}px 0` }}
        />
      );
  }
}

export default memo(Divider);
