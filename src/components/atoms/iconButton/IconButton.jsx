import styles from './IconButton.module.css';

export function IconButton({ noHoverEffect = false, ...rest }) {
  return (
    <button
      className={styles.icon_button}
      data-no-hover={noHoverEffect}
      {...rest}
    />
  );
}
