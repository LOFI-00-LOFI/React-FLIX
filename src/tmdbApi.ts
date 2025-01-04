import axios, { AxiosRequestConfig } from 'axios';

// Define base URL and API key
const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY; // Replace with your TMDB API key

// Axios instance
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

// Centralized GET request function
const get = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  try {
    const response = await axiosInstance.get<T>(url, config);
    return response.data;
  } catch (error) {
    console.error('TMDB API Error:', error);
    throw error;
  }
};

// API functions
export const tmdbApi = {
  fetchPopularMovies: (page: number = 1) =>
    get<{ results: Movie[] }>(`/movie/popular`, { params: { page } }),

  fetchTrendingMovies: (timeWindow: string = 'week') =>
    get<{ results: Movie[] }>(`/trending/movie/${timeWindow}`),

  fetchTopRatedMovies: (page: number = 1) =>
    get<{ results: Movie[] }>(`/movie/top_rated`, { params: { page } }),

  getGenres: () =>
    get<{ genres: Genre[] }>(`/genre/movie/list`),

  getMoviesByGenre: (genreId: number, page: number = 1) =>
    get<{ results: Movie[] }>(`/discover/movie`, {
      params: { with_genres: genreId, page },
    }),

  getMovieTrailer: async (movieId: number): Promise<Trailer> => {
    const data = await get<{ results: any[] }>(
      `/movie/${movieId}/videos`
    );
    const trailer = data.results.find(
      (video) => video.type === 'Trailer' && video.site === 'YouTube'
    );
    if (!trailer) {
      throw new Error('No trailer found');
    }
    return trailer;
  },

  getMovieDetails: (movieId: number) =>
    get<MovieDetails>(`/movie/${movieId}`),

  getSimilarMovies: (movieId: number, page: number = 1) =>
    get<{ results: Movie[] }>(`/movie/${movieId}/similar`, { params: { page } }),

  searchMovies: (keyword: string, page: number = 1) => {
    if (!keyword.trim()) {
      return Promise.resolve([]);
    }
    const encodedKeyword = encodeURIComponent(keyword.trim());
    return get<{ results: Movie[] }>(`/search/movie`, {
      params: { query: encodedKeyword, page },
    }).then((data) => data.results || []);
  },
};
