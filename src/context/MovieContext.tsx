import React, { createContext, useContext, useState, ReactNode } from 'react';

interface MovieContextType {
    selectedMovie: Movie | null;
    setSelectedMovie: (movie: Movie | null) => void;
    trailerURL: string;
    setTrailerURL: (url: string) => void;
    playerMuted: boolean;
    setPlayerMuted: (muted: boolean) => void;
    isModalOpen: boolean;
    setIsModalOpen: (open: boolean) => void;
    popularMovies: Movie[] | null;
    setpopularMovies: (movies: Movie[] | null) => void;
    trendingMovies: Movie[] | null;
    setTrendingMovies: (movies: Movie[] | null) => void;
    topRatedMovies: Movie[] | null;
    setTopRatedMovies: (movies: Movie[] | null) => void;
    moviesByGenres: { id: number; name: string; movies: Movie[] }[] | null;
    setMoviesByGenres: (genres: { id: number; name: string; movies: Movie[] }[] | null) => void;
}

const MovieContext = createContext<MovieContextType | undefined>(undefined);

export const MovieProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
    const [popularMovies, setpopularMovies] = useState<Movie[] | null>(null);
    const [trendingMovies, setTrendingMovies] = useState<Movie[] | null>(null);
    const [topRatedMovies, setTopRatedMovies] = useState<Movie[] | null>(null);
    const [moviesByGenres, setMoviesByGenres] = useState<{ id: number; name: string; movies: Movie[] }[] | null>(null);
    const [trailerURL, setTrailerURL] = useState<string>('');
    const [playerMuted, setPlayerMuted] = useState<boolean>(true);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    return (
        <MovieContext.Provider
            value={{
                popularMovies,
                setpopularMovies,
                trendingMovies,
                setTrendingMovies,
                topRatedMovies,
                setTopRatedMovies,
                moviesByGenres,
                setMoviesByGenres,
                selectedMovie,
                setSelectedMovie,
                trailerURL,
                setTrailerURL,
                playerMuted,
                setPlayerMuted,
                isModalOpen,
                setIsModalOpen,
            }}
        >
            {children}
        </MovieContext.Provider>
    );
};

export const useMovieContext = () => {
    const context = useContext(MovieContext);
    if (!context) {
        throw new Error('useMovieContext must be used within a MovieProvider');
    }
    return context;
};