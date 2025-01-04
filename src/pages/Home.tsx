import React, { useEffect, useState } from 'react';
import { useMovieContext } from '../context/MovieContext'; // Import the context
import { tmdbApi } from '../tmdbApi';
import Hero from '../components/Hero/Hero'; // Assuming you have a Hero component
import Carousel from '../components/Carousel/Carousel';



const Home: React.FC = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [genresWithMovies, setgenresWithMovies] = useState<GenreWithMovies[] | null>(null);

    const {
        setSelectedMovie,
        setIsModalOpen,
        popularMovies,
        setpopularMovies,
        trendingMovies,
        setTrendingMovies,
        topRatedMovies,
        setTopRatedMovies,
        setMoviesByGenres,
    } = useMovieContext(); // Use context

    useEffect(() => {
        const loadMovies = async () => {
            try {
                setIsLoading(true);

                const [pmovies, trending, topRated, allGenres] = await Promise.all([
                    tmdbApi.fetchPopularMovies(),
                    tmdbApi.fetchTrendingMovies(),
                    tmdbApi.fetchTopRatedMovies(),
                    tmdbApi.getGenres(),
                ]);


                const allGenresWithMovies = await Promise.all(
                    allGenres.genres.map(async (genre) => {
                        const movies = await tmdbApi.getMoviesByGenre(genre.id);
                        return { id: genre.id, name: genre.name, movies: movies.results };
                    })
                );

                setgenresWithMovies(allGenresWithMovies);

                // Set the movies in context
                setpopularMovies(pmovies.results);
                setTrendingMovies(trending.results);
                setTopRatedMovies(topRated.results);
                setMoviesByGenres(allGenresWithMovies);

                const randomIndex = Math.floor(Math.random() * pmovies.results.length);
                const selected = pmovies.results[randomIndex];
                setSelectedMovie(selected);
            } catch (error) {
                console.error("Error fetching movies:", error);
            } finally {
                setIsLoading(false);
            }
        };

        loadMovies();
    }, [
        setSelectedMovie,
        setIsModalOpen,
        setpopularMovies,
        setTrendingMovies,
        setTopRatedMovies,
        setMoviesByGenres,
        setgenresWithMovies,
    ]);

    return (
        <div>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <Hero />
                    <div className="absolute w-full top-[35vh] md:top-[65vh] lg:top-[85vh] pl-10 flex flex-col space-y-4">
                        {popularMovies && <Carousel title="Popular Movies" items={popularMovies} />}
                        {trendingMovies && <Carousel title="Trending Movies" items={trendingMovies} />}
                        {topRatedMovies && <Carousel title="Top-Rated Movies" items={topRatedMovies} />}
                        {genresWithMovies?.map((moviesList) => (
                            <Carousel key={moviesList.id} title={moviesList.name} items={moviesList.movies} />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default Home;
