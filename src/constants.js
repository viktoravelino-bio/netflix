export const apiKey = import.meta.env.VITE_APP_TMDB_V3_API_KEY;
export const baseUrl = 'https://api.themoviedb.org/3';

export const mediaTypeMap = {
  movie: 'movie',
  serie: 'tv',
};

export const genresMap = {
  popular: 'popular',
  topRated: 'top_rated',
  upcoming: 'upcoming',
  nowPlaying: 'now_playing',
};

export const youtubeUrl = 'https://www.youtube.com/watch?v=';

export const endpoints = {
  trending: () => `/trending/all/week?api_key=${apiKey}&language=en-US`,

  netflixOriginals: ({ mediaType = mediaTypeMap.serie }) =>
    `/discover/${mediaType}?api_key=${apiKey}&with_networks=213`,

  topRated: ({ mediaType = mediaTypeMap.serie }) =>
    `/${mediaType}/top_rated?api_key=${apiKey}&language=en-US`,

  getDetails: ({ mediaType = mediaTypeMap.serie, id }) =>
    `/${mediaType}/${id}?api_key=${apiKey}&append_to_response=videos`,

  getComedy: ({ mediaType = mediaTypeMap.serie }) =>
    `/discover/${mediaType}?api_key=${apiKey}&with_genres=35`,
  getAction: ({ mediaType = mediaTypeMap.serie }) =>
    `/discover/${mediaType}?api_key=${apiKey}&with_genres=80`,
  getHorror: ({ mediaType = mediaTypeMap.serie }) =>
    `/discover/${mediaType}?api_key=${apiKey}&with_genres=9648`,
};

//https://api.themoviedb.org/3/tv/119051?api_key=84975c36290b000967b257a66306f283&append_to_response=videos
