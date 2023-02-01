import { formatSecondsToTime } from '../../../lib';
import styles from './MediaTimeProgress.module.css';

export function MediaTimeProgress({
  currentTime,
  duration,
  progress,
  handleManualVideoProgress,
}) {
  const formattedCurrentTime = formatSecondsToTime(currentTime);
  const formattedDurationTime = formatSecondsToTime(duration);

  return (
    <div className={styles.time_progress__container}>
      <span>{formattedCurrentTime}</span>

      <div className={styles.progress_bar__container}>
        <input
          className={styles.progress_bar}
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={handleManualVideoProgress}
        />

        <div
          className={styles.progress_bar__progress}
          style={{
            width: progress + '%',
          }}
        />
      </div>

      <span>{formattedDurationTime}</span>
    </div>
  );
}
