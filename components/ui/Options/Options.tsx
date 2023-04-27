import { ComponentProps, useEffect, useRef, useState } from 'react';
import styles from './Options.module.css';
import cn from 'classnames';
import { GoKebabVertical } from 'react-icons/go';

interface OptionsProps extends ComponentProps<'div'> {}
interface OptionProps extends ComponentProps<'span'> {}

type OptionsType = React.FunctionComponent<OptionsProps> & {
  Option: React.FC<OptionProps>;
};

const Option: React.FC<OptionProps> = ({ children, className, ...props }) => {
  return (
    <span className={cn(styles.option, className)} {...props}>
      {children}
    </span>
  );
};

type PlacementType = 'bottom' | 'top' | null;

const Options: OptionsType = ({ children, className }) => {
  const [state, setState] = useState<boolean>(false);
  const [placement, setPlacement] = useState<PlacementType>('bottom');

  const ref = useRef<HTMLDivElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleState = () => setState((prev) => !prev);

  useEffect(() => {
    if (state) {
      const dropdownHeight = dropdownRef.current?.getBoundingClientRect().height!;
      const menuY = ref.current?.getBoundingClientRect().bottom!;
      const windowHeight = window.outerHeight;
      if (windowHeight - menuY < dropdownHeight + 80) {
        setPlacement('top');
      } else {
        setPlacement('bottom');
      }
    }
  }, [dropdownRef.current, state]);

  useEffect(() => {
    const closeOptions = (e: MouseEvent) => {
      // @ts-ignore
      if (!ref.current?.contains(e.target)) {
        setState(false);
      }
    };

    if (state) {
      document.addEventListener('click', closeOptions);
    }

    return () => document.removeEventListener('click', closeOptions);
  }, [ref.current, state]);

  return (
    <div ref={ref} className={cn(styles.container, className)}>
      <div className={styles.button} onClick={handleState}>
        <GoKebabVertical />
      </div>

      <div
        ref={dropdownRef}
        className={cn(styles.options, {
          [styles.active]: state,
          [styles.bottom]: placement === 'bottom',
          [styles.top]: placement === 'top',
        })}
      >
        {children}
      </div>
    </div>
  );
};

Options.Option = Option;

export default Options;
