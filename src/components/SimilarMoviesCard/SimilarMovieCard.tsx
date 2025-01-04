import React, { useState } from 'react';
import { Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { tmdbApi } from '../../tmdbApi';
import { useMovieContext } from '../../context/MovieContext';
import { useUtilsContext } from '../../context/UtilsContext';

interface SimilarMovieCardProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  duration?: string;
}

const SimilarMovieCard: React.FC<SimilarMovieCardProps> = ({
  id,
  title,
  description,
  imageUrl,
  duration = '22m',
}) => {
  const navigate = useNavigate();
  const [imgSrc, setImgSrc] = useState<string>(imageUrl);

  const {setIsModalOpen} = useMovieContext()
  const {handleNoImageError} = useUtilsContext()

 

  const handlePlayClick = async() => {

     const trailerRes = await tmdbApi.getMovieTrailer(parseInt(id));
    navigate(`/watch/${trailerRes.key}`);
    // Implement modal closure here
    // For example, if using a context or a prop function
    // closeModal();
    setIsModalOpen(false);
  };

  return (
    <div className="bg-[#181818] text-white rounded-lg shadow-md sm:w-48 w-40">
      <div className="relative">
        <img
          src={imgSrc}
          alt={title}
          onError={handleNoImageError}
          className="rounded-t-lg w-full h-40 object-cover"
        />

        <div className="absolute top-2 right-2 bg-[#000000b3] text-white px-2 py-0.5 rounded-md text-sm font-semibold">
          {duration}
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] to-transparent"></div>

        <h3 className="absolute bottom-0 left-2 font-semibold text-base mb-1.5">
          {title}
        </h3>
      </div>

      <div className="p-3">
        <div className="flex flex-col text-sm mb-1">
          <div className="flex justify-between">
            <div className="flex flex-col justify-between items-center">
              <div className="text-[#46d369]">
                <span>67% Match</span>
              </div>
              <div className="text-[#b3b3b3]">
                <span className="px-1 mr-2 border-[#b3b3b3] border">5+</span>
                <span>2023</span>
              </div>
            </div>

            <div>
              <button
                onClick={handlePlayClick}
                className="rounded-full transition-colors duration-200 p-3 border-2 border-gray-700 hover:border-white"
              >
                <Play className="text-white h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
        <p className="text-xs text-[#b3b3b3] mb-3 leading-tight">
          {description.length > 50
            ? `${description.substring(0, 50)}...`
            : description}
        </p>
      </div>
    </div>
  );
};

export default SimilarMovieCard;
