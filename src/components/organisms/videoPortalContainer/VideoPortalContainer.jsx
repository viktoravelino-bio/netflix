import { usePortalContext } from '../../../providers/Portal';
import { Portal } from '../../molecules/portal/Portal';
import { motion, AnimatePresence } from 'framer-motion';
import { useCallback, useRef, useState } from 'react';

import { useDomEvent } from '../../../hook/use-dom-event';
import { MediaMiniModal } from '../../molecules/mediaMiniModal/MediaMiniModal';

const ANIMATION = {
  initial: { scale: 1, opacity: 0 },
  animate: {
    scale: 1.3,
    opacity: 1,
    transition: {
      duration: 0.2,
    },
  },
  exit: {
    scale: 1,
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
};

export function VideoPortalContainer() {
  const { anchorElement, mediaData } = usePortalContext();
  const [_, setCount] = useState(0);

  const windowRef = useRef(window);

  const rect = anchorElement?.getBoundingClientRect();
  const show = (anchorElement && mediaData) !== null;

  const updateRender = useCallback(() => {
    setCount((prev) => prev + 1);
  }, []);

  useDomEvent(windowRef, 'scroll', updateRender);

  return (
    <Portal>
      <AnimatePresence>
        {show && (
          <motion.div
            {...ANIMATION}
            style={{
              position: 'fixed',
              lay: 'inline-block',
              zIndex: 1000,
              width: rect?.width,
              left: rect?.x,
              top: rect?.top,
            }}
          >
            <MediaMiniModal mediaData={mediaData} />
          </motion.div>
        )}
      </AnimatePresence>
    </Portal>
  );
}
