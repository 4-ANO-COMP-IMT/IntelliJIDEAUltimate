import React from 'react';
import { MapContainer, TileLayer, Polygon, Marker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const MapView: React.FC<{ center: [number, number]; zoom: number; selectedRegion: any[]; isPolygon: boolean; }> = ({ center, zoom, selectedRegion, isPolygon }) => {
    const MapEvents = () => {
        const map = useMap();
        map.setView(center, zoom);
        return null;
    };

    return (
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
    );
};

export default MapView;
