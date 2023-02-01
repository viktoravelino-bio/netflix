import { useEffect, useState } from 'react';
import { getTmdbImageUrl } from '../lib';
import { api } from '../lib/api';

export function useGetVideosByMediaTypeAndGenre({ mediaType, genre }) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!mediaType || !genre) return;

    async function load() {
      setIsLoading(true);
      const {
        data: { results },
      } = await api.get(`/${mediaType}/${genre}`).catch((err) => {
        console.log(err);
      });

      const videoListWithBackdrop = results
        .filter((video) => !!video.backdrop_path)
        .map((video) => ({
          ...video,
          backdropPath: getTmdbImageUrl(video.backdrop_path),
          name: video.title || video.original_title,
        }))
        .sort((a, b) => 0.5 - Math.random()); //shuffles the array;

      setData(videoListWithBackdrop);
      setIsLoading(false);
    }

    load();
  }, [mediaType, genre]);

  return {
    data,
    isLoading,
  };
}
