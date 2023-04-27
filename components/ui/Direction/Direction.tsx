import { ComponentProps } from 'react';
import styles from './Direction.module.css';
import cn from 'classnames';

interface DirectionProps extends ComponentProps<'div'> {
  column?: boolean;
  gap?: number;
  justify?: 'center' | 'end' | 'start';
}

const Direction: React.FC<DirectionProps> = ({
  children,
  gap = 10,
  justify = 'start',
  column = false,
  style,
  className,
  ...props
}) => {
  const inlineStyles = {
    gap,
    justifyContent: justify,
  };

  return (
    <div
      style={inlineStyles}
      className={cn(styles.direction, className, {
        [styles.column]: column,
      })}
      {...props}
    >
      {children}
    </div>
  );
};

export default Direction;
