import { Route, Routes, Navigate } from 'react-router-dom';
import { MainLayout } from '../layout/MainLayout';
import { Home } from '../pages/home/Home';
import { Watch } from '../pages/watch/Watch';

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Navigate to="/browse" />} />

        <Route path="latest" element={<Home />} />
      </Route>

      <Route path="/">
        <Route path="browse" element={<MainLayout />}>
          <Route index element={<Home />} />
        </Route>

        <Route path="browse" element={<MainLayout headerFixed={false} />}>
          <Route path="my-list" element={<Home />} />
          <Route path="genre">
            <Route path="series" element={<Home />} />
            <Route path="movies" element={<Home />} />
          </Route>
        </Route>
      </Route>

      <Route path="watch">
        <Route path=":videoId" element={<Watch />} />
      </Route>

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
