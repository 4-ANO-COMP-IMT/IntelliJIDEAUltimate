import React from 'react';
import ResultItem from './ResultItem';
import { Card } from 'react-bootstrap';

interface ResultListProps {
    places: any[];
    selectedPlace: any;
    onSelectPlace: (place: any) => void;
}

const ResultList: React.FC<ResultListProps> = ({ places, selectedPlace, onSelectPlace }) => {
    return (
        <Card style={{ maxHeight: '400px', overflowY: 'auto' }}>
            <Card.Body>
                {places.length === 0 ? (
                    <div className="text-center text-muted">
                        Nenhum resultado encontrado. Digite o nome de um lugar para buscar.
                    </div>
                ) : (
                    places.map((place, index) => (
                        <ResultItem
                            key={index}
                            place={place}
                            isSelected={selectedPlace && selectedPlace.place_id === place.place_id}
                            onSelect={() => onSelectPlace(place)}
                        />
                    ))
                )}
                {selectedPlace === null && places.length > 0 && (
                    <div className="text-center text-muted mt-2">
                        Caso não tenha selecionado um lugar, as imagens de todos os lugares aparecerão aqui.
                    </div>
                )}
            </Card.Body>
        </Card>
    );
};

export default ResultList;
