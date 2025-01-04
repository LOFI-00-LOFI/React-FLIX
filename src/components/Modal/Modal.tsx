import React, { useEffect, useState } from 'react';
import { Play, Volume2, VolumeOff, Check, Plus, ThumbsUp } from 'lucide-react';
// import SimilarMovieCard from './SimilarMovieCard'; // Ensure this component is imported
import { useNavigate } from 'react-router-dom';
import { tmdbApi } from '../../tmdbApi';
import VideoPlayer from '../VideoPlayer/VideoPlayer';
import { useUtilsContext } from '../../context/UtilsContext';
import SimilarMovieCard from '../SimilarMoviesCard/SimilarMovieCard';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    movieData: Movie; 
    videoId?: string | null;
}

const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    movieData,
}) => {
    const navigate = useNavigate();



    const [addedToFav, setaddedToFav] = useState<boolean>(false)
    const [muted, setmuted] = useState<boolean>(false)

    const toggleMuteVideo = () => {
        setmuted(!muted)
    }

    const { addToFavoriteList } = useUtilsContext()

    const [movieDetails, setmovieDetails] = useState<MovieDetails | null>(null)


      useEffect(() => {
        let list = JSON.parse(localStorage.getItem('list') || '[]');
        setaddedToFav(list.some((m: Movie) => m.id === movieData.id));
    
        const fetchData = async () => {
            try {
                setloadingSimilarMovies(true);
    
                const trailerRes = await tmdbApi.getMovieTrailer(movieData?.id);
                setvideoId(trailerRes.key);
    
                const detailsRes = await tmdbApi.getMovieDetails(movieData?.id);
                setmovieDetails(detailsRes);
    
                const similarMoviesRes = await tmdbApi.getSimilarMovies(movieData?.id);
                setsimilarMovies(similarMoviesRes.results);
            } catch (err) {
                seterrorLoadingSimilar(true);
            } finally {
                setloadingSimilarMovies(false);
            }
        };
    
        setmuted(true);
        fetchData();
    }, [isOpen]);


    const [videoId, setvideoId] = useState('')
    const [similarMovies, setsimilarMovies] = useState<Movie[]>([])
    const [loadingSimilarMovies, setloadingSimilarMovies] = useState<boolean>(false)
    const [errorLoadingSimilar, seterrorLoadingSimilar] = useState<boolean>(false)


    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div
                className="h-[90vh] overflow-y-scroll overflow-x-hidden w-[85%] md:w-[80%] lg:w-[50%] bg-[#141414] text-white rounded-lg relative "
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    className="absolute z-50 top-4 right-6 text-white bg-black px-2 rounded-full text-3xl"
                    onClick={onClose}
                    aria-label="Close Modal"
                >
                    &times;
                </button>

                {/* Video Section */}
                {videoId ? (
                    <div className="relative">
                        <div className="absolute inset-0 z-20 bottom-0 bg-gradient-to-t from-[#141414] to-transparent"></div>

                        <div className="absolute z-50 left-12 bottom-2 w-[90%]">
                            <p className="text-4xl font-bold mb-4">{movieData?.title}</p>

                            <div className="flex items-center justify-between ">

                                <div className='flex items-center gap-4'>

                                    <button
                                        className="flex text-2xl items-center gap-2 bg-white text-black px-12 py-2 rounded-md hover:bg-gray-200 transition"
                                        onClick={() => {
                                            navigate(`/watch/${movieData?.id}`);
                                            onClose();
                                        }}
                                    >
                                        <Play size={20} />
                                        <span className="font-semibold lg:block hidden">Play</span>
                                    </button>

                                    <button
                                        className="rounded-full p-3 border-2 border-gray-700 hover:border-white transition"
                                        onClick={() => { addToFavoriteList(movieData); setaddedToFav(!addedToFav) }}
                                    >
                                        {addedToFav ? (
                                            <Check className="text-white h-6 w-6" />
                                        ) : (
                                            <Plus className="text-white h-6 w-6" />
                                        )}
                                    </button>

                                    <button className="rounded-full p-3 border-2 border-gray-700 hover:border-white transition">
                                        <ThumbsUp className="text-white h-6 w-6" />
                                    </button>
                                </div>

                                <div className='pr-2'>
                                    <button
                                        onClick={toggleMuteVideo}
                                        className="rounded-full p-3 border-2 border-gray-700 hover:border-white transition"
                                    >
                                        {muted ? <VolumeOff /> : <Volume2 />}
                                    </button>
                                </div>
                            </div>


                        </div>

                        <div className='pointer-events-none overflow-hidden'>
                            <VideoPlayer videoId={videoId} isMuted={muted} />
                        </div>
                    </div>
                ) : (
                    <div className="flex justify-center items-center h-64 bg-gray-800">
                        <p>Video not available...</p>
                    </div>
                )}

                {/* Movie Details */}
                <div className="p-12 relative">
                    <div className="absolute inset-0 h-[20px] bottom-0 bg-gradient-to-b from-[#141414] to-transparent"></div>

                    <div className='flex-col md:flex-row flex'>
                        <div className='w-[100%] md:w-[60%]' >
                            <div className="flex items-center gap-4 mb-4">
                                <span className="text-green-400">
                                    {movieDetails?.vote_average
                                        ? `${(movieDetails.vote_average * 10).toFixed(0)}% Match`
                                        : 'N/A'}
                                </span>
                                <span className="border border-gray-600 px-2 rounded-sm">
                                    {movieDetails?.adult ? '18+' : '13+'}
                                </span>
                                <span className="font-bold">
                                    {movieDetails?.runtime ? `${movieDetails.runtime} mins` : 'N/A'}
                                </span>
                                <span className="border border-gray-700 px-2 rounded-sm">4K</span>
                            </div>
                            <p>{movieDetails?.overview || 'No overview available.'}</p>
                        </div>

                        {/* Genres and Languages */}
                        <div className="mt-4 flex-1 flex flex-col ">
                            <p>
                                <strong>Genres:</strong>{' '}
                                {movieDetails?.genres?.map((genre: any) => genre.name).join(', ') ||
                                    'N/A'}
                            </p>
                            <p>
                                <strong>Languages:</strong>{' '}
                                {movieDetails?.spoken_languages
                                    ?.map((lang: any) => lang.name)
                                    .join(', ') || 'N/A'}
                            </p>
                        </div>
                    </div>



                    {loadingSimilarMovies ? (
                        <p className="mt-4 text-center">Loading Similar Movies...</p>
                    ) : errorLoadingSimilar ? (
                        <p className="mt-4 text-center text-red-500">
                            Error loading similar movies.
                        </p>
                    ) : similarMovies.length > 0 ? (
                        <div className="mt-4">
                            <h3 className="text-xl font-bold mb-4">More Like This</h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {similarMovies.slice(0, 12).map((movie) => (
                                  
                                    <SimilarMovieCard
                                        key={movie.id}
                                        id={movie.id.toString()}
                                        title={movie.title as string}
                                        description={movie.overview as string}
                                        imageUrl={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                                    />
                                ))}
                            </div>
                        </div>
                    ) : null}
                </div>

            </div>
        </div>
    );
};

export default Modal;
