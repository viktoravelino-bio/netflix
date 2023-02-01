import {
  InfoIcon,
  MutedIcon,
  PlayIcon,
  SpeakerIcon,
} from '../../../assets/icons';
import { genresMap } from '../../../constants';
import { useGetRandomVideoByMediaTypeAndGenre } from '../../../hook/use-get-random-video-by-media-type-and-genre';
import { truncate } from '../../../lib';
import { Button } from '../../atoms/button/Button';
import styles from './Banner.module.css';
import YouTubePlayer from 'react-player/youtube';
import { useState } from 'react';

export function Banner({ mediaType }) {
  const [backdropOpacity, setBackdropOpacity] = useState(1);
  const [muted, setMuted] = useState(true);
  const [showMuteButton, setShowMuteButton] = useState(false);
  const { data: movie } = useGetRandomVideoByMediaTypeAndGenre({
    mediaType,
    genre: genresMap.popular,
  });

  if (!movie) {
    return null;
  }

  function onPlayerReady(player) {
    const hasError = player.getInternalPlayer().getPlayerState() < 0;
    if (hasError) return;
    player.getInternalPlayer().playVideo();
    setTimeout(() => setBackdropOpacity(0), 1000);
    setShowMuteButton(true);
  }

  function onPlayerEnded() {
    setMuted(true);
    setBackdropOpacity(1);
    setShowMuteButton(false);
  }

  function onPlayerError() {
    console.log('YouTube loading video error');
  }

  return (
    <div className={styles.banner}>
      <div
        style={{
          inset: 0,
          position: 'absolute',
        }}
      >
        <YouTubePlayer
          url={movie.trailerYouTubeKey}
          width="100%"
          height="100%"
          muted={muted}
          onError={onPlayerError}
          onReady={onPlayerReady}
          onEnded={onPlayerEnded}
          config={{
            playerVars: {
              controls: 0,
              autoplay: 1,
              modestbranding: 1,
              iv_load_policy: 3,
            },
            embedOptions: {
              controls: 0,
              autoplay: 1,
            },
          }}
        />
      </div>
      <div
        style={{
          transition: 'opacity 1s',
          position: 'absolute',
          inset: 0,
          opacity: backdropOpacity,
          zIndex: 1,
        }}
      >
        <img
          src={movie.backdropPath}
          alt=""
          style={{
            objectFit: 'cover',
          }}
        />
      </div>
      <div className={styles.banner__content}>
        <div className={styles.banner__content__info}>
          <div className={styles.banner__complementary__text}>
            <span>{movie.name}</span>
          </div>

          <div className={styles.banner__synopsis}>
            <span>{truncate(movie.overview, 150)}</span>
          </div>

          <div className={styles.banner__buttons}>
            <Button leftIcon={PlayIcon}>Play</Button>
            <Button variant="secondary" leftIcon={InfoIcon}>
              More Info
            </Button>
            {/* <Button onClick={() => setMuted((prev) => !prev)}>Mute</Button> */}
          </div>
        </div>
        <div className={styles.banner__classification__wrapper}>
          {showMuteButton && (
            <Button rounded onClick={() => setMuted((prev) => !prev)}>
              {muted ? <MutedIcon /> : <SpeakerIcon />}
            </Button>
          )}
          <div className={styles.banner__classification}>R</div>
        </div>
      </div>
    </div>
  );
}
