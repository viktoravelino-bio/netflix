import { NavLink } from 'react-router-dom';
import { NotificationIcon, SearchIcon } from '../../../assets/icons';
import classNames from 'classnames';
import styles from './styles.module.css';
import { useEffect, useRef } from 'react';

export function Header({ headerFixed = true }) {
  const headerRef = useRef();

  useDocumentScroll((e) => {
    const scrollToTop = e.target.scrollingElement.scrollTop;
    if (scrollToTop > 0) {
      headerRef.current.classList.add(styles.header__scrolled);
    } else {
      headerRef.current.classList.remove(styles.header__scrolled);
    }
  });

  return (
    <header
      ref={headerRef}
      className={classNames(styles.header, {
        [styles.header__fixed]: headerFixed,
      })}
    >
      <nav>
        <NavLink to="/" className={styles.header__logo} href="">
          <img src="/Netflix_logo.png" alt="logo" width={92.5} />
        </NavLink>

        <ul className={styles.header__links}>
          <li>
            <NavLink
              to="/browse"
              className={({ isActive }) =>
                isActive ? styles.active : undefined
              }
              end
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/browse/genre/series"
              className={({ isActive }) =>
                isActive ? styles.active : undefined
              }
              end
            >
              Series
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/browse/genre/movies"
              className={({ isActive }) =>
                isActive ? styles.active : undefined
              }
              end
            >
              Movies
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/latest"
              className={({ isActive }) =>
                isActive ? styles.active : undefined
              }
            >
              Trending
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/browse/my-list"
              className={({ isActive }) =>
                isActive ? styles.active : undefined
              }
              end
            >
              My List
            </NavLink>
          </li>
        </ul>

        <div className={styles.header__actions}>
          <SearchIcon />
          <NotificationIcon />

          <div className={styles.header__user__dropdown}>
            <NavLink to="your-account">
              <img
                src="http://occ-0-681-1722.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABY20DrC9-11ewwAs6nfEgb1vrORxRPP9IGmlW1WtKuaLIz8VxCx5NryzDK3_ez064IsBGdXjVUT59G5IRuFdqZlCJCneepU.png?r=229"
                alt=""
              />
            </NavLink>
            <span className={classNames(styles.caret, styles.active)}></span>
          </div>
        </div>
      </nav>
    </header>
  );
}

function useDocumentScroll(callback) {
  useEffect(() => {
    document.addEventListener('scroll', callback);

    return () => {
      document.removeEventListener('scroll', callback);
    };
  }, []);
}
