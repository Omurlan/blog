import { ComponentProps } from 'react';
import styles from './Card.module.css';
import cn from 'classnames';

interface CardProps extends ComponentProps<'div'> {
  pt?: boolean;
  pb?: boolean;
  pl?: boolean;
  pr?: boolean;
}

const Card: React.FC<CardProps> = ({
  className,
  children,
  pb = true,
  pl = true,
  pt = true,
  pr = true,
  ...props
}) => {
  return (
    <div
      className={cn(styles.card, className, {
        [styles.pb]: !pb,
        [styles.pt]: !pt,
        [styles.pl]: !pl,
        [styles.pr]: !pr,
      })}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
