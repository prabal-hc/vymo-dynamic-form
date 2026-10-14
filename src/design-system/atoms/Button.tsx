import type { ReactNode } from 'react';
import styles from './Button.module.css';

type ButtonProps = {
  children: ReactNode;
  type?: 'button' | 'submit';
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
};

export function Button({ children, type = 'button', variant = 'primary', onClick }: ButtonProps) {
  return (
    <button type={type} className={`${styles.button} ${styles[variant]}`} onClick={onClick}>
      {children}
    </button>
  );
}
