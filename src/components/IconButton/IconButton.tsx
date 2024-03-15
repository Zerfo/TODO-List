import { ButtonHTMLAttributes, ReactNode, memo } from 'react';

import clsx from 'clsx';

import styles from './IconButton.module.scss';

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	icon: ReactNode;
	className?: string;
}

function IconButton(props: IProps) {
  const { icon, className } = props;

  return (
    <button {...props} className={clsx(styles.wrapper, className)}>
      {icon}
    </button>
  );
}

export default memo(IconButton);
