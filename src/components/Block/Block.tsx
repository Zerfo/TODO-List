import { ReactNode, memo } from 'react';

import clsx from 'clsx';

import styles from './Block.module.scss';

type TProps = {
	children: ReactNode;
	className?: string;
};

function Block(props: TProps) {
  const { children, className } = props;

  return <div className={clsx(styles.wrapper, className)}>{children}</div>;
}

export default memo(Block);
