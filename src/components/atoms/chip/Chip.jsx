import styles from './Chip.module.css';

export function Chip({ size = 'md', rounded, ...rest }) {
  return (
    <div
      className={styles.chip}
      data-size={size}
      data-rounded={rounded}
      {...rest}
    />
  );
}
