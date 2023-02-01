export function getComponentSize({ height, width, size }) {
  if (width || height) return { width, height };

  return {
    width: size,
    height: size,
  };
}
