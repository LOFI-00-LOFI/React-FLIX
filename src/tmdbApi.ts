import axios, { AxiosRequestConfig } from 'axios';

// Define base URL and API key
const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY; // Ensure this is correctly set

// Axios instance
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});


// GetOptions Interface
interface GetOptions<T> {
  config?: AxiosRequestConfig;
  defaultValue: T;
}

// Centralized GET request function with options object
const get = async <T>(
  url: string,
  options: GetOptions<T>
): Promise<T> => {
  const { config, defaultValue } = options;
  try {
    const response = await axiosInstance.get<T>(url, config);
    return response.data;
  } catch (error) {
    console.error('TMDB API Error:', error);
    return defaultValue;
  }
};

// API functions
export const tmdbApi = {
  fetchPopularMovies: (page: number = 1) =>
    get<{ results: Movie[] }>(`/movie/popular`, {
      config: { params: { page } },
      defaultValue: { results: [] },
    }),

  fetchTrendingMovies: (timeWindow: string = 'week') =>
    get<{ results: Movie[] }>(`/trending/movie/${timeWindow}`, {
      defaultValue: { results: [] },
    }),

  fetchTopRatedMovies: (page: number = 1) =>
    get<{ results: Movie[] }>(`/movie/top_rated`, {
      config: { params: { page } },
      defaultValue: { results: [] },
    }),

  getGenres: () =>
    get<{ genres: Genre[] }>(`/genre/movie/list`, {
      defaultValue: { genres: [] },
    }),

  getMoviesByGenre: (genreId: number, page: number = 1) =>
    get<{ results: Movie[] }>(`/discover/movie`, {
      config: { params: { with_genres: genreId, page } },
      defaultValue: { results: [] },
    }),

  getMovieTrailer: async (movieId: number): Promise<Trailer> => {
    const data = await get<{ results: Trailer[] }>(`/movie/${movieId}/videos`, {
      defaultValue: { results: [] },
    });
    const trailer = data.results.find(
      (video) => video.type === 'Trailer' && video.site === 'YouTube'
    );
    return trailer || { key: '', type: '', site: '' };
  },

  getMovieDetails: (movieId: number) =>
    get<MovieDetails>(`/movie/${movieId}`, {
      defaultValue: {
        id: 0,
        title: 'Unknown Title',
        overview: 'No overview available.',
        release_date: 'N/A',
        genres: [],
      },
    }),

  getSimilarMovies: (movieId: number, page: number = 1) =>
    get<{ results: Movie[] }>(`/movie/${movieId}/similar`, {
      config: { params: { page } },
      defaultValue: { results: [] },
    }),

  searchMovies: (keyword: string, page: number = 1) => {
    if (!keyword.trim()) {
      return Promise.resolve({ results: [] } as { results: Movie[] });
    }
    const encodedKeyword = encodeURIComponent(keyword.trim());
    return get<{ results: Movie[] }>(`/search/movie`, {
      config: { params: { query: encodedKeyword, page } },
      defaultValue: { results: [] },
    }).then((data) => data.results || []);
  },
};
