import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Spinner, Card, ListGroup } from 'react-bootstrap';
import { MapContainer, TileLayer, Polygon, Marker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import L from 'leaflet';

const RegionFilter: React.FC<{ isOpen: boolean }> = ({ isOpen }) => {
    const [selectedRegion, setSelectedRegion] = useState<any[]>([]);
    const [placeName, setPlaceName] = useState<string>('');
    const [foundPlaces, setFoundPlaces] = useState<any[]>([]);
    const [center, setCenter] = useState<[number, number]>([0, 0]);
    const [zoom, setZoom] = useState<number>(2);
    const [isPolygon, setIsPolygon] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (isOpen) {
            const handleResize = () => {
                window.dispatchEvent(new Event('resize'));
            };
            handleResize();
        }
    }, [isOpen]);

    const handleSearch = async () => {
        if (!placeName) return;

        setLoading(true);
        try {
            const response = await axios.get(`https://nominatim.openstreetmap.org/search`, {
                params: {
                    q: placeName,
                    format: 'json',
                    polygon_geojson: 1,
                },
            });

            if (response.data.length > 0) {
                setFoundPlaces(response.data);
            } else {
                alert('Local não encontrado');
                setFoundPlaces([]);
            }
        } catch (error) {
            console.error('Erro ao buscar o local:', error);
            alert('Erro ao buscar o local');
            setFoundPlaces([]);
        } finally {
            setLoading(false);
        }
    };

    const selectPlace = (place: any) => {
        if (place.geojson && place.geojson.type === 'Polygon') {
            const coordinates = place.geojson.coordinates[0].map((coord: [number, number]) => ({
                lat: coord[1],
                lng: coord[0],
            }));
            setSelectedRegion(coordinates);
            setCenter([parseFloat(place.lat), parseFloat(place.lon)]);
            setZoom(10);
            setIsPolygon(true);
        } else {
            setSelectedRegion([]);
            setCenter([parseFloat(place.lat), parseFloat(place.lon)]);
            setZoom(15);
            setIsPolygon(false);
        }
    };

    const MapEvents = () => {
        const map = useMap();
        map.setView(center, zoom);
        return null;
    };

    return (
        <Card className="mb-3">
            <Card.Body>
                <Form.Group controlId="regionFilter">
                    <Form.Label>Região</Form.Label>
                    <Row>
                        <Col md={8}>
                            <div style={{ height: '400px', width: '100%' }}>
                                <MapContainer center={center} zoom={zoom} style={{ height: '100%', width: '100%' }}>
                                    <TileLayer
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        attribution="&copy; OpenStreetMap contributors"
                                    />
                                    {isPolygon ? (
                                        <Polygon positions={selectedRegion} />
                                    ) : (
                                        <Marker position={center} icon={L.icon({
                                            iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
                                            iconSize: [25, 41],
                                            iconAnchor: [12, 41],
                                        })} />
                                    )}
                                    <MapEvents />
                                </MapContainer>
                            </div>
                        </Col>
                        <Col md={4}>
                            <Form.Control
                                type="text"
                                placeholder="Nome do lugar (País, Estado, etc.)"
                                value={placeName}
                                onChange={(e) => setPlaceName(e.target.value)}
                                className="mb-2"
                            />
                            <Button variant="primary" onClick={handleSearch} className="mb-2" disabled={loading}>
                                {loading ? <Spinner animation="border" size="sm" /> : 'Buscar'}
                            </Button>
                            {foundPlaces.length > 0 && (
                                <ListGroup>
                                    {foundPlaces.map((place, index) => (
                                        <ListGroup.Item key={index}>
                                            {place.display_name}
                                            <Button
                                                variant="outline-primary"
                                                size="sm"
                                                className="ml-2"
                                                onClick={() => selectPlace(place)}
                                            >
                                                Selecionar
                                            </Button>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </Col>
                    </Row>
                </Form.Group>
            </Card.Body>
        </Card>
    );
};

export default RegionFilter;
