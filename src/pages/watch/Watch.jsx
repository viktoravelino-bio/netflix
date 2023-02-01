import {
  ArrowLeft,
  ClockClockwise,
  ClockCounterClockwise,
  ClosedCaptioning,
  FrameCorners,
  Pause,
  Play,
  PlayCircle,
  SpeakerSimpleHigh,
  SpeakerSimpleSlash,
} from 'phosphor-react';
import { useRef } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { IconButton } from '../../components/atoms/iconButton/IconButton';
import { MediaTimeProgress } from '../../components/molecules/mediaTimeProgress/MediaTimeProgress';
import { useDomEvent } from '../../hook/use-dom-event';
import { useVideoPlayer } from '../../hook/use-video-player';

import styles from './Watch.module.css';
import { useGetVideoDetails } from '../../hook/use-get-video-details';

export function Watch() {
  const videoRef = useRef(null);
  const controlsRef = useRef(null);

  const navigate = useNavigate();

  const { videoId } = useParams();
  const [searchParams] = useSearchParams();
  const queryParams = Object.fromEntries([...searchParams]);

  const { data, isLoading } = useGetVideoDetails({
    mediaType: queryParams.mediaType,
    mediaId: queryParams.mediaId,
  });

  const {
    togglePlayPause,
    handleFullscreen,
    playerState,
    onTimeUpdate,
    handleManualVideoProgress,
    toggleMute,
  } = useVideoPlayer(videoRef);

  function test() {
    // console.log('test23');
  }

  useDomEvent(controlsRef, 'mousemove', test);

  // useEffect(() => {
  //   if (!videoRef.current) return;
  //   videoRef.current.play();
  // }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div
      style={{
        color: 'white',
        backgroundColor: 'black',
        width: '100vw',
        height: '100vh',
        display: 'grid',
        placeItems: 'center',
      }}
    >
      <video
        ref={videoRef}
        width="100%"
        playsInline
        onTimeUpdate={onTimeUpdate}
        src={`https://viktor-bucket-s3.s3.ca-central-1.amazonaws.com/example_video.mp4`}
      ></video>

      <div
        className={styles.controls}
        ref={controlsRef}
        onClick={togglePlayPause}
        onDoubleClick={handleFullscreen}
      >
        <IconButton
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            padding: 0,
            filter: 'drop-shadow(1px 2px 10px rgba(0,0,0,1))',
            opacity: playerState.isPlaying ? 0 : 1,
            pointerEvents: playerState.isPlaying ? 'none' : 'unset',
            transition: 'opacity .2s ease-in-out',
          }}
          noHoverEffect
        >
          <PlayCircle size={100} weight="fill" color="white" />
        </IconButton>

        <div
          className={styles.top_controls__container}
          onClick={(e) => e.stopPropagation()}
        >
          <IconButton onClick={() => navigate(-1)}>
            <ArrowLeft size={32} weight="bold" color="white" />
          </IconButton>
        </div>
        <div
          className={styles.bottom_controls__container}
          onClick={(e) => e.stopPropagation()}
        >
          <MediaTimeProgress
            currentTime={playerState.currentTime}
            duration={playerState.duration}
            progress={playerState.progress}
            handleManualVideoProgress={handleManualVideoProgress}
          />

          <div
            style={{
              display: 'flex',
              padding: '1rem 1rem',
              fontSize: '1.2rem',
              alignItems: 'center',
            }}
          >
            <IconButton onClick={togglePlayPause}>
              {playerState.isPlaying ? (
                <Pause size={28} weight="fill" color="white" />
              ) : (
                <Play size={28} weight="fill" color="white" />
              )}
            </IconButton>

            <IconButton
              onClick={() => {
                videoRef.current.currentTime -= 10;
              }}
            >
              <ClockCounterClockwise color="white" size={28} weight="fill" />
            </IconButton>

            <IconButton
              onClick={() => {
                videoRef.current.currentTime += 10;
              }}
            >
              <ClockClockwise color="white" size={28} weight="fill" />
            </IconButton>

            <IconButton onClick={toggleMute}>
              {playerState.isMuted ? (
                <SpeakerSimpleSlash size={28} weight="bold" color="white" />
              ) : (
                <SpeakerSimpleHigh size={28} weight="bold" color="white" />
              )}
            </IconButton>

            <span style={{ flex: '1', textAlign: 'center' }}>{data?.name}</span>

            <IconButton>
              <ClosedCaptioning size={28} weight="bold" color="white" />
            </IconButton>
            <IconButton onClick={handleFullscreen}>
              <FrameCorners size={28} weight="bold" color="white" />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
}
