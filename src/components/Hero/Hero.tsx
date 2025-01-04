// Hero.tsx
import React, { useEffect } from 'react';
import { Play, Info, Volume2, VolumeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import VideoPlayer from '../VideoPlayer/VideoPlayer';
import { useMovieContext } from '../../context/MovieContext'; // Import the context
import { tmdbApi } from '../../tmdbApi';


const Hero: React.FC = () => {
    const {
        selectedMovie,
        setTrailerURL,
        trailerURL,
        playerMuted,
        setPlayerMuted,
        setIsModalOpen,
    } = useMovieContext(); // Use context
    const navigate = useNavigate();

    useEffect(() => {

        
        const fetchTrailer = async () => {
            if (selectedMovie) {
                try {
                    const trailer = await tmdbApi.getMovieTrailer(selectedMovie.id);
                    setTrailerURL(trailer.key); // Assuming the trailer object has a 'key' property
                } catch (error) {
                    console.error("Error fetching trailer:", error);
                }
            }
        };

        fetchTrailer();
    }, [selectedMovie]);

    const toggleMute = () => {
        setPlayerMuted(prev => !prev);
    };



    return (
        <main className="relative overflow-hidden">
            {/* Video Player */}
            {trailerURL && (

                <VideoPlayer
                    videoId={trailerURL}
                    isMuted={playerMuted}
                    toggleMute={toggleMute}
                    />
            )}

            {selectedMovie && !trailerURL && (
                <img
                    src={`https://image.tmdb.org/t/p/original${selectedMovie.backdrop_path}`}
                    alt="movie backdrop"
                />
            )}

            {/* gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#141414] to-transparent"></div>

            {/* movie details */}
            {selectedMovie && (
                <div className="absolute top-[38%]  pl-12 w-full z-10">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
                        {selectedMovie.title.length > 30 && window.innerWidth < 768 ? selectedMovie.title.substring(0, 30) + "..." : selectedMovie.title}
                    </h1>

                    <p className="text-sm md:text-lg hidden md:block mb-6 max-w-lg text-gray-300">
                        {selectedMovie.overview?.substring(0, 150) + "..."}
                    </p>

                    <div className="flex flex-wrap items-center">
                        <div className="flex gap-4">
                            <button
                                onClick={() => navigate(`/watch/${trailerURL}`)}
                                className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-md hover:bg-gray-200 transition"
                            >
                                <Play size={20} />
                                <span className="font-semibold">Play</span>
                            </button>

                            <button
                                onClick={()=>{setIsModalOpen(true)}} // Open modal on click
                                className="flex items-center gap-2 bg-gray-700 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition"
                            >
                                <Info size={20} />
                                <span className="font-semibold">More Info</span>
                            </button>
                        </div>

                        <div className="absolute right-0 flex items-center gap-4">
                            <button
                                onClick={toggleMute}
                                className="flex items-center p-4 border-2 text-white rounded-full transition"
                            >
                                {playerMuted ? <VolumeOff size={20} /> : <Volume2 size={20} />}
                            </button>

                            <div className="bg-gray-600 bg-opacity-60 text-white border-l-2 px-3 py-2">
                                <span>18+</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

           
        </main>
    );
};

export default Hero;