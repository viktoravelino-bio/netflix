import { useEffect, useState } from 'react';
import { youtubeUrl } from '../constants';
import { getRandomInt, getTmdbImageUrl } from '../lib';
import { api } from '../lib/api';

export function useGetRandomVideoByMediaTypeAndGenre({ mediaType, genre }) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!mediaType || !genre) return;

    async function load() {
      setIsLoading(true);
      const {
        data: { results },
      } = await api.get(`/${mediaType}/${genre}`);

      const videoList = results.filter((video) => !!video.backdrop_path);

      const randomVideoId = videoList[getRandomInt(videoList.length)].id;

      const { data: videoDetail } = await api.get(
        `/${mediaType}/${randomVideoId}?append_to_response=videos`
      );

      Object.assign(videoDetail, {
        trailerYouTubeKey: youtubeUrl + videoDetail.videos.results[0].key,
        name:
          videoDetail.title || videoDetail.name || videoDetail.original_title,
        backdropPath: getTmdbImageUrl(videoDetail.backdrop_path),
      });

      setData(videoDetail);
      setIsLoading(false);
    }

    load();
  }, [mediaType, genre]);

  return {
    data,
    isLoading,
  };
}
