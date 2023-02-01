import { createPortal } from "react-dom";

export function Portal({ children }) {
  const mount = document.getElementById('portal-root');

  if (!mount) {
    const body = document.getElementsByTagName('body')[0];
    const div = document.createElement('div');
    div.setAttribute('id', 'portal-root');
    body.appendChild(div);
  }

  return mount ? createPortal(children, mount) : null;
}
