import { FC, useEffect, useState } from 'react';
import Card from '../components/Card/Card';
import { useParams } from 'react-router-dom';
import { tmdbApi } from '../tmdbApi';

const Search: FC = () => {

    const { query } = useParams<{ query: string }>();


    const [movies, setMovies] = useState<Movie[]>([]); // Define Movie type if needed

    useEffect(() => {
        const fetchData = async () => {


                const data = await tmdbApi.searchMovies(query || '', 1);
                setMovies(Array.isArray(data) ? data : data.results);
           
        };

        fetchData();
    }, [query]);

    return (
        <div className="absolute top-36 flex flex-wrap px-12 justify-around gap-4">
            {movies.length > 0 ? (
                movies.map((item, index) => (
                    <Card key={index} item={item} /> // Pass the movie item to the Card component
                ))
            ) : (
                <p className="text-white text-xl">No movies for the term ${query}</p>
            )}
        </div>
    );
};

export default Search;