export function formatSecondsToTime(duration) {
  const s = Math.floor(duration % 60);
  const m = Math.floor(duration / 60);
  const h = Math.floor(duration / 3600);

  const seconds = s < 10 ? `0${s}` : s;
  const minutes = m < 10 ? `0${m}` : m;
  const hours = h < 10 ? `0${h}` : h;

  return `${hours}:${minutes}:${seconds}`;
}
