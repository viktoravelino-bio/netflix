import { Banner } from '../../components/molecules/banner/Banner';
import { MediaRow } from '../../components/organisms/mediaRow/MediaRow';
import styles from './styles.module.css';

import { genresMap, mediaTypeMap } from '../../constants';

export function Home() {
  return (
    <div style={{ backgroundColor: 'var(--clr-background)' }}>
      <Banner mediaType={mediaTypeMap.movie} />

      <div className={styles.rows__container}>
        <MediaRow
          title={genresMap.topRated}
          mediaType={mediaTypeMap.movie}
          genre={genresMap.topRated}
        />

        <MediaRow
          title={genresMap.nowPlaying}
          mediaType={mediaTypeMap.movie}
          genre={genresMap.nowPlaying}
        />

        <MediaRow
          title={genresMap.popular}
          mediaType={mediaTypeMap.movie}
          genre={genresMap.popular}
        />

        <MediaRow
          title={genresMap.upcoming}
          mediaType={mediaTypeMap.movie}
          genre={genresMap.upcoming}
        />
      </div>
    </div>
  );
}
