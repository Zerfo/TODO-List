import { ReactNode, memo } from 'react';

import clsx from 'clsx';

import styles from './Title.module.scss';

type TProps = {
	children: ReactNode;
	level?: 1 | 2 | 3 | 4 | 5 | 6;
	className?: string;
};

function Title(props: TProps) {
  const { level = 'h1', className, children } = props;

  switch (level) {
    case 1:
      return (
        <h1 className={clsx(styles.title, styles.h1, className)}>{children}</h1>
      );
    case 2:
      return (
        <h2 className={clsx(styles.title, styles.h2, className)}>{children}</h2>
      );
    case 3:
      return (
        <h3 className={clsx(styles.title, styles.h3, className)}>{children}</h3>
      );
    case 4:
      return (
        <h4 className={clsx(styles.title, styles.h4, className)}>{children}</h4>
      );
    case 5:
      return (
        <h5 className={clsx(styles.title, styles.h5, className)}>{children}</h5>
      );
    case 6:
      return (
        <h6 className={clsx(styles.title, styles.h6, className)}>{children}</h6>
      );
    default:
      return (
        <h1 className={clsx(styles.title, styles.h1, className)}>{children}</h1>
      );
  }
}

export default memo(Title);
