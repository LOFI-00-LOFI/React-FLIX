import React, { useEffect, useState } from 'react';
import {
    Check,
    ChevronDown,
    Play,
    Plus,
    ThumbsUp,
    Volume2,
    VolumeOff,
} from 'lucide-react'; // Adjust the import path for icons
import { useCardContext } from '../../context/CardContext'; // Adjust the import path
import { tmdbApi } from '../../tmdbApi';
import VideoPlayer from '../VideoPlayer/VideoPlayer';
import { useMovieContext } from '../../context/MovieContext';
import { Link } from 'react-router-dom';
import { useUtilsContext } from '../../context/UtilsContext';

interface PopupCardProps {
    isHovered: boolean;
    x: number;
    y: number;
}

const PopupCard: React.FC<PopupCardProps> = ({ isHovered, x, y }) => {
    const [isPopOverHovered, setIsPopOverHovered] = useState(false);
    const [trailerUrl, setTrailerUrl] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [movieId, setMovieId] = useState<number>(0);
    const [showTrailer, setShowTrailer] = useState(false);
    const [title, setTitle] = useState('MOVIE');
    const [muted, setMuted] = useState(true);
    const [addedToFavorite, setAddedToFavorite] = useState(false);
    const [favData, setFavData] = useState<Movie | null>(null);

    const { cardState, setCardState } = useCardContext(); // Use context
    const { setIsModalOpen, setSelectedMovie } = useMovieContext(); // Use context
    const { addToFavoriteList, movieList } = useUtilsContext();

    const styles = {
        popupCard: {
            backgroundColor: 'rgb(20, 20, 20)',
            boxShadow:
                'rgba(0, 0, 0, 0.2) 0px 2px 1px 1px, rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 1px 3px 1px',
            backgroundImage:
                'linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))',
            borderRadius: '8px',
            transformOrigin: 'center',
            position: 'fixed',
            width: '350px',
            zIndex: 1000,
            overflow: 'hidden',
        },
        popupScaleDown: {
            transform: 'translate(-50%, -100%) scale(0)', // Scale to 0
            opacity: 0, // Fully transparent
        },
        popupScaleUp: {
            transform: 'translate(-50%, -100%) scale(1)',
            opacity: 1,
        },
        transitionAll: {
            transition: 'transform 0.3s ease 0.1s, opacity 0.3s ease',
        },
    };

    useEffect(() => {
        const handleScroll = () => {
            if (cardState.isHovered) {
                setCardState((prev: any) => ({
                    ...prev,
                    isHovered: false,
                }));
            }
        };
        document.addEventListener('scroll', handleScroll);
        return () => {
            document.removeEventListener('scroll', handleScroll);
        };
    }, [cardState.isHovered, setCardState]);

    useEffect(() => {
        if (cardState.item) {
            setImageUrl(
                `https://image.tmdb.org/t/p/w500${cardState.item.backdrop_path}`
            );
            setMovieId(cardState.item.id);
            setTitle(cardState.item.title || 'MOVIE');
            setFavData(cardState.item);

            let list = JSON.parse(localStorage.getItem('list') || '[]');

            setAddedToFavorite(
                list.some((m: Movie) => m.id === cardState.item.id)
            );

            const fetchTrailerUrl = async () => {
                const url = await tmdbApi.getMovieTrailer(cardState.item.id);
                setTrailerUrl(url.key);
            };

            fetchTrailerUrl();
        }
    }, [cardState]);

    const handlePopoverMouseEnter = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsPopOverHovered(true);
    };

    const handlePopoverMouseLeave = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsPopOverHovered(false);
        setCardState((prev: any) => ({
            ...prev,
            item: null,
            isHovered: false,
            cardId: null,
        }));
        setShowTrailer(false);
    };

    const toggleMuteAction = () => {
        setMuted(!muted);
    };

    return (
        <div
            className="text-white flex flex-col z-40" // Retain necessary Tailwind classes
            style={{
                ...styles.popupCard,
                top: `${y + 270}px`,
                left: `${
                    x < 200
                        ? x + 60
                        : window.innerWidth - x < 200
                        ? x - 60
                        : x
                }px`,
                ...(isHovered
                    ? { ...styles.popupScaleUp }
                    : { ...styles.popupScaleDown }),
                ...styles.transitionAll,
            }}
            onMouseEnter={handlePopoverMouseEnter}
            onMouseLeave={handlePopoverMouseLeave}
        >
            <div
                onMouseEnter={() => setShowTrailer(true)}
                onMouseLeave={() => setShowTrailer(false)}
                className="relative w-full h-[198px]"
            >
                <div className="flex items-center">
                    <p className="absolute text-ellipsis z-50 top-36 left-2 font-semibold text-xl">
                        {title.length > 25
                            ? `${title.substring(0, 25)}...`
                            : title}
                    </p>
                    <span
                        onClick={toggleMuteAction}
                        className="absolute cursor-pointer z-50 transition-colors duration-200 top-36 right-4 p-3 border-2 border-gray-700 rounded-full hover:border-white"
                    >
                        {muted ? (
                            <VolumeOff size={20} />
                        ) : (
                            <Volume2 size={20} />
                        )}
                    </span>
                </div>

                {trailerUrl && showTrailer ? (
                    <div className="pointer-events-none w-full h-full border-gray-700">
                        <VideoPlayer
                            pip={true}
                            isMuted={muted}
                            videoId={trailerUrl}
                        />
                    </div>
                ) : imageUrl ? (
                    <img
                        className="w-full h-full object-cover"
                        src={imageUrl}
                        alt="Poster"
                    />
                ) : (
                    <div className="w-full h-[200px] bg-gray-500 flex items-center justify-center">
                        <span className="text-white text-sm">
                            No Image Available
                        </span>
                    </div>
                )}
            </div>

            <div className="flex justify-between items-center p-4">
                <div className="flex space-x-2">
                    <Link
                        to={`/watch/${trailerUrl}`}
                        className="rounded-full transition-colors duration-200 p-3 border-2 border-gray-700 hover:border-white"
                    >
                        <Play className="text-white h-6 w-6" />
                    </Link>
                    <button
                        onClick={() => {
                            addToFavoriteList(favData as Movie);
                            setAddedToFavorite(!addedToFavorite);
                        }}
                        className="rounded-full transition-colors duration-200 p-3 border-2 border-gray-700 hover:border-white"
                    >
                        {addedToFavorite ? (
                            <Check className="text-white h-6 w-6" />
                        ) : (
                            <Plus className="text-white h-6 w-6" />
                        )}
                    </button>
                    <button className="rounded-full transition-colors duration-200 p-3 border-2 border-gray-700 hover:border-white">
                        <ThumbsUp className="text-white h-6 w-6" />
                    </button>
                </div>
                <button
                    onClick={() => {
                        setIsModalOpen(true);
                        setSelectedMovie(favData as Movie);
                        setCardState((prev: any) => ({
                            ...prev,
                            item: null,
                            isHovered: false,
                            cardId: null,
                        }));
                    }}
                    className="rounded-full transition-colors duration-200 p-3 border-2 border-gray-700 hover:border-white"
                >
                    <ChevronDown className="text-white h-6 w-6" />
                </button>
            </div>

            <div className="p-4">
                <div className="flex gap-3">
                    <span className="text-green-400">70% Match</span>
                    <span className="border-2 border-gray-600 rounded-sm text-sm">
                        13+
                    </span>
                    <span className="font-bold">21m</span>
                    <span className="border-2 border-gray-600 rounded-sm text-sm">
                        HD
                    </span>
                </div>
                <div className="mt-2 text-lg flex space-x-2">
                    <span>Witty • Heartfelt • Drama</span>
                </div>
            </div>
        </div>
    );
};

export default PopupCard;
