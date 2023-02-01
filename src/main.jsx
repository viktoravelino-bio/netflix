import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { VideoPortalContainer } from './components/organisms/videoPortalContainer/VideoPortalContainer';

import { PortalProvider } from './providers/Portal';
import { AppRouter } from './routes';

import './styles/global.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <PortalProvider>
        <AppRouter />
        <VideoPortalContainer />
      </PortalProvider>
    </BrowserRouter>
  </React.StrictMode>
);
