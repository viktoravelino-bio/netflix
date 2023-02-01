//function truncate text
export function truncate(text, length) {
  return text?.length > length ? text.substring(0, length - 1) + '...' : text;
}
