import React from 'react';
import { ListGroup } from 'react-bootstrap';
import ResultItem from './ResultItem';

interface ResultListProps {
    places: any[];
    selectedPlace: any;
    onSelectPlace: (place: any) => void;
}

const ResultList: React.FC<ResultListProps> = ({ places, selectedPlace, onSelectPlace }) => {
    return (
        <ListGroup>
            {places.map((place, index) => (
                <ResultItem
                    key={index}
                    place={place}
                    isSelected={selectedPlace && selectedPlace.place_id === place.place_id}
                    onSelect={() => onSelectPlace(place)}
                />
            ))}
        </ListGroup>
    );
};

export default ResultList;
    