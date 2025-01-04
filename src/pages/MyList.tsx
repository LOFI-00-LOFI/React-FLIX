import React, { useEffect, useState } from 'react';
import Card from '../components/Card/Card';
import { useUtilsContext } from '../context/UtilsContext';

const MyList: React.FC = () => {

    const {movieList} = useUtilsContext()


    useEffect(() => {
    }, [movieList]);

    return (
        <div className="absolute top-36 flex flex-wrap left-12 gap-4">
            {movieList.length > 0 ? (
                movieList.map((item, index) => (
                    <Card key={index} item={item} /> // Pass the movie item to the Card component
                ))
            ) : (
                <p className="text-white text-xl">No movies in your list...</p>
            )}
        </div>
    );
};

export default MyList;