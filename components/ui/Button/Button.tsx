import { ComponentProps } from 'react';
import styles from './Button.module.css';
import cn from 'classnames';

interface ButtonProps extends ComponentProps<'button'> {
  color?: string;
}

const Button: React.FC<ButtonProps> = ({ className, color, children, ...props }) => {
  return (
    <button
      className={cn(styles.button, className, {
        [styles.danger]: color === 'danger',
      })}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
