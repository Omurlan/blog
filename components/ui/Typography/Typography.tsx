import React, { ComponentProps, useMemo } from 'react';
import styles from './Typography.module.css';
import cn from 'classnames';

type TypographyVariantType = 'title' | 'title2' | 'text' | 'text2' | 'caption' | 'caption2';
enum TypographyTag {
  h1 = 'h1',
  h3 = 'h3',
  p = 'p',
}

interface TypographyProps extends ComponentProps<'p'> {
  variant: TypographyVariantType;
}

const Typography: React.FC<TypographyProps> = ({ variant, className, ...props }) => {
  const Component: TypographyTag = useMemo(() => {
    if (variant === 'title') {
      return TypographyTag.h1;
    } else if (variant === 'title2') {
      return TypographyTag.h3;
    } else return TypographyTag.p;
  }, [variant]);

  return (
    <Component
      className={cn(styles.typography, className, {
        [styles.title]: variant === 'title',
        [styles.title2]: variant === 'title2',
        [styles.text]: variant === 'text',
        [styles.text2]: variant === 'text2',
        [styles.caption]: variant === 'caption',
        [styles.caption2]: variant === 'caption2',
      })}
      {...props}
    ></Component>
  );
};

export default Typography;
