import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react'; // Adjust the import path for icons
import Card from '../Card/Card'; // Adjust the import path for your Card component
import './Carousel.css';



interface CarouselProps {
    title: string;
    items: Movie[];
}

const Carousel: React.FC<CarouselProps> = ({ title, items }) => {

    
    const carouselContainer = useRef<HTMLDivElement | null>(null);
    const [scrollPosition, setScrollPosition] = useState<number>(0);
    const scrollAmount: number = 320;

    const scrollLeft = () => {
        if (carouselContainer.current) {
            const newPosition = Math.max(0, scrollPosition - scrollAmount);
            setScrollPosition(newPosition);
            carouselContainer.current.scrollTo({
                left: newPosition,
                behavior: 'smooth',
            });
        }
    };

    const scrollRight = () => {
        if (carouselContainer.current) {
            const newPosition = scrollPosition + scrollAmount;
            setScrollPosition(newPosition);
            carouselContainer.current.scrollTo({
                left: newPosition,
                behavior: 'smooth',
            });
        }
    };

    const handleScroll = () => {
        if (carouselContainer.current) {
            setScrollPosition(carouselContainer.current.scrollLeft);
        }
    };

    return (
        <div className="carousel-wrapper">
            <h1 className="mt-4 mb-2 text-white text-2xl font-semibold">{title}</h1>
            <div className="carousel-container-wrapper relative">
                {scrollPosition > 0 && (
                    <button onClick={scrollLeft} className="carousel-button carousel-button-left">
                        <ChevronLeft />
                    </button>
                )}
                {carouselContainer.current && (scrollPosition + (carouselContainer.current.clientWidth) < carouselContainer.current.scrollWidth) && (
                    <button onClick={scrollRight} className="carousel-button carousel-button-right">
                        <ChevronRight />
                    </button>
                )}
                <div
                    ref={carouselContainer}
                    className="carousel-container"
                    onScroll={handleScroll}
                >
                    {items.map((item) => (
                        <div className="carousel-item" key={item.id}>
                            <Card item={item} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Carousel;