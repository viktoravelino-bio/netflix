import { useEffect, useState } from 'react';

export function useVideoPlayer(videoElementRef) {
  const [playerState, setPlayerState] = useState({
    isPlaying: false,
    isMuted: false,
    volume: 1,
    duration: 0,
    currentTime: 0,
    progress: 0,
    speed: 1,
  });

  function togglePlayPause() {
    setPlayerState((prev) => ({
      ...prev,
      isPlaying: !prev.isPlaying,
    }));
  }

  useEffect(() => {
    playerState.isPlaying
      ? videoElementRef.current.play()
      : videoElementRef.current.pause();
  }, [playerState.isPlaying, videoElementRef]);

  function toggleMute() {
    setPlayerState((prev) => ({
      ...prev,
      isMuted: !prev.isMuted,
    }));
  }

  useEffect(() => {
    playerState.isMuted
      ? (videoElementRef.current.muted = true)
      : (videoElementRef.current.muted = false);
  }, [playerState.isMuted, videoElementRef]);

  function onTimeUpdate() {
    const currentTime = videoElementRef.current.currentTime;
    const duration = videoElementRef.current.duration;
    const progress = (currentTime / duration) * 100;
    setPlayerState((prev) => ({
      ...prev,
      currentTime,
      duration,
      progress,
    }));
  }

  function handleManualVideoProgress(event) {
    const change = Number(event.target.value);
    const newCurrentTime = (videoElementRef.current.duration / 100) * change;
    videoElementRef.current.currentTime = newCurrentTime;

    setPlayerState((prev) => ({
      ...prev,
      progress: change,
      currentTime: newCurrentTime,
    }));
  }

  function handleVideoSpeed(event) {
    const speed = Number(event.target.value);
    videoElementRef.current.playbackRate = speed;
    setPlayerState((prev) => ({
      ...prev,
      speed,
    }));
  }

  function handleFullscreen() {
    const requestsFullscreenByBrowser = [
      'requestFullscreen', // standard
      'webkitRequestFullscreen', // safari
      'mozRequestFullscreen', // firefox
      'msRequestFullscreen', // IE
    ];

    const requestFullscreen = requestsFullscreenByBrowser.find((fnName) => {
      return typeof videoElementRef.current[fnName] === 'function';
    });

    videoElementRef.current[requestFullscreen]?.();
  }

  return {
    playerState,
    togglePlayPause,
    toggleMute,
    onTimeUpdate,
    handleManualVideoProgress,
    handleVideoSpeed,
    handleFullscreen,
  };
}
