import React from 'react';
import { useCardContext } from '../../context/CardContext'; // Adjust the import path

interface CardProps {
    item: Movie;
}

import './Card.css'
import { useUtilsContext } from '../../context/UtilsContext';

const Card: React.FC<CardProps> = ({ item }) => {
    const { setCardState, cardState } = useCardContext(); // Use context
    const {handleNoImageError} = useUtilsContext(); // Use context

    const handleHover = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {

        if (cardState.cardId === item.id && cardState.isHovered) return;

        const cardElement = e.currentTarget as HTMLElement;
        const cardRect = cardElement.getBoundingClientRect()


        setCardState({
            item,
            isHovered: true,
            cardId: item.id,
            position: { x: cardRect.left + cardRect.width / 2, y: cardRect.top  }

        });


    };



    return (
        <div
            className="card pointer-events-auto relative sm:w-56 w-36"
            onMouseEnter={handleHover}
            role="presentation"
        >
            <img
            onError={(e)=>{handleNoImageError(e)}}
                src={`https://image.tmdb.org/t/p/w300${item.backdrop_path}`}
                alt={item.title}
                className="w-full h-auto"
            />
        </div>
    );
};

export default Card;