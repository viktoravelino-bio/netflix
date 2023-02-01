import { Outlet } from 'react-router-dom';
import { Header } from '../components/molecules/header';

export function MainLayout({ headerFixed = true }) {
  return (
    <div>
      <Header headerFixed={headerFixed} />
      <Outlet />
    </div>
  );
}
