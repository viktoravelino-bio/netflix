import { genres } from '../../../data/mock.json';

import styles from './MediaRow.module.css';
import { useGetVideosByMediaTypeAndGenre } from '../../../hook/use-get-videos-by-media-type-and-genre';
import { ViewRowItem } from '../../molecules/viewRowItem/ViewRowItem';
import { Carousel } from '@mantine/carousel';
import { useEffect, useState } from 'react';

export function MediaRow({ title, mediaType, genre }) {
  const [embla, setEmbla] = useState(null);
  const [selectedSnap, setSelectedSnap] = useState(0);

  const { data, isLoading } = useGetVideosByMediaTypeAndGenre({
    mediaType,
    genre,
  });

  const formattedTitle =
    title[0].toUpperCase() + title.substring(1).replace('_', ' ');

  useEffect(() => {
    if (embla) {
      embla.on('scroll', () => {
        setSelectedSnap(embla.selectedScrollSnap());
      });
    }
  }, [embla]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.row} style={{ paddingInlineStart: '0' }}>
      <div className={styles.row__header}>
        <h2 className={styles.row__title}>{formattedTitle}</h2>
        <div className={styles.row__dots}>
          {embla?.scrollSnapList().map((_, index) => (
            <div
              key={index}
              style={{
                backgroundColor: selectedSnap === index ? 'white' : 'grey',
                height: '2px',
                width: '12px',
              }}
            />
          ))}
        </div>
      </div>

      <div className={styles.row__posters}>
        <Carousel
          controlsOffset={0}
          slideGap="xs"
          getEmblaApi={setEmbla}
          slideSize="80px"
          align="start"
          loop
          sx={{
            paddingLeft: '2rem',
          }}
          styles={{
            controls: {
              translate: '0% -50%',
              top: '50%',
            },
            control: {
              height: '140px',
              borderRadius: 0,
              backgroundColor: 'rgba(0,0,0,0.8)',
              border: 'none',
              color: 'white',
              width: '40px',
              '&[data-inactive]': {
                opacity: 0,
                cursor: 'default',
              },
              '& >svg': {
                width: '30px',
                height: '30px',
              },
            },
          }}
        >
          {data.map((media) => (
            <Carousel.Slide key={media.id}>
              <ViewRowItem
                media={{
                  ...media,
                  genres: genres.movies
                    .filter((genre) => media.genre_ids.includes(genre.id))
                    .map((genre) => genre.name),
                  mediaType,
                }}
              />
            </Carousel.Slide>
          ))}
        </Carousel>
      </div>
    </div>
  );
}
