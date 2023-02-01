import { useCallback, createContext, useContext, useState } from 'react';

export const PortalContext = createContext();

export function PortalProvider({ children }) {
  const [anchorElement, setAnchorElement] = useState(null);
  const [mediaData, setMediaData] = useState(null);
  const [detailsModal, setDetailsModal] = useState(false);

  const handleChangePortal = useCallback((anchor, media) => {
    setAnchorElement(anchor);
    setMediaData(media);
  }, []);

  const handleCloseMiniModal = useCallback(() => {
    setAnchorElement(null);
  }, []);

  return (
    <PortalContext.Provider
      value={{
        anchorElement,
        mediaData,
        detailsModal,
        closeMiniModal: handleCloseMiniModal,
        setMiniModal: handleChangePortal,
        setGigaModal: setDetailsModal,
      }}
    >
      {children}
    </PortalContext.Provider>
  );
}

export function usePortalContext() {
  return useContext(PortalContext);
}
