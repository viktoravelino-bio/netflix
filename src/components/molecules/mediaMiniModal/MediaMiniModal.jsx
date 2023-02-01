import { useNavigate } from 'react-router-dom';
import {
  CaretDownIcon,
  PlayIcon,
  PlusIcon,
  ThumbsUpIcon,
} from '../../../assets/icons';
import { useClickOutside } from '../../../hook/use-click-outside';
import { usePortalContext } from '../../../providers/Portal';
import { Button } from '../../atoms/button/Button';
import { Chip } from '../../atoms/chip/Chip';

import styles from './MediaMiniModal.module.css';

export function MediaMiniModal({ mediaData }) {
  const { closeMiniModal } = usePortalContext();
  const ref = useClickOutside(closeMiniModal);
  const navigate = useNavigate();

  return (
    <div
      ref={ref}
      className={styles.media_modal__container}
      onMouseLeave={closeMiniModal}
      onClick={() => {
        console.log(mediaData);
        navigate(
          `/watch/example_video?mediaType=${mediaData.mediaType}&mediaId=${mediaData.id}`
        );
        closeMiniModal();
      }}
    >
      <div>
        <img src={mediaData.backdropPath} alt={mediaData.name} />
      </div>

      <div className={styles.media_modal__body_container}>
        <div className={styles.media_modal__action_buttons}>
          <Button rounded>
            <PlayIcon />
          </Button>
          <Button rounded variant="outlined" label="Add to my list">
            <PlusIcon />
          </Button>
          <Button rounded variant="outlined">
            <ThumbsUpIcon />
          </Button>
          <Button rounded variant="outlined">
            <CaretDownIcon />
          </Button>
        </div>

        <div className="media_modal__header">
          <h3 className={styles.media_modal__media_relevance}>
            {mediaData.vote_average * 10}% match
          </h3>
          <div className={styles.media_modal__media_info}>
            <Chip>TV-14</Chip>
            <span style={{ fontSize: '.875rem' }}>4 seasons</span>
            <Chip size="sm" rounded>
              HD
            </Chip>
          </div>
        </div>

        <div className={styles.media_modal__genres}>
          {mediaData.genres.map((genre) => (
            <span key={genre}>{genre}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
