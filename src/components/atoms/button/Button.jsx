import classNames from 'classnames';
import styles from './styles.module.css';

export function Button({
  children,
  leftIcon: LeftIcon = null,
  variant = 'primary',
  rounded = false,
  ...rest
}) {
  return (
    <button
      className={classNames(styles.button)}
      data-variant={variant}
      data-rounded={rounded}
      {...rest}
    >
      {LeftIcon && <LeftIcon />}
      {children}
    </button>
  );
}
