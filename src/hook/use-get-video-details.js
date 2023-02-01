import { useEffect, useState } from 'react';
import { api } from '../lib/api';

export function useGetVideoDetails({ mediaType, mediaId }) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function load() {
      setIsLoading(true);

      const { data: videoDetail } = await api.get(
        `/${mediaType}/${mediaId}?append_to_response=videos`
      );

      Object.assign(videoDetail, {
        // trailerYouTubeKey: youtubeUrl + videoDetail.videos.results[0].key,
        name:
          videoDetail.title || videoDetail.name || videoDetail.original_title,
        // backdropPath: getTmdbImageUrl(videoDetail.backdrop_path),
      });

      setData(videoDetail);
      setIsLoading(false);
    }

    load();
  }, [mediaType, mediaId]);

  return {
    data,
    isLoading,
  };
}
