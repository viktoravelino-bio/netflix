import { useRef } from 'react';
import { usePortalContext } from '../../../providers/Portal';
import styles from './ViewRowItem.module.css';

export function ViewRowItem({ media }) {
  const { setMiniModal } = usePortalContext();
  const ref = useRef();

  return (
    <div
      ref={ref}
      onMouseEnter={() => setTimeout(() => setMiniModal(ref.current, media), 300)}
      className={styles.row__poster}
    >
      <img src={media.backdropPath} alt={media.name} />
    </div>
  );
}
