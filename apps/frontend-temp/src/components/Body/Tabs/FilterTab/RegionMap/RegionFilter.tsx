import React, { useState, useEffect } from "react";
import { Row, Col, Card } from "react-bootstrap";
import axios from "axios";
import MapView from "./MapView";
import SearchBar from "./SearchBar";
import ResultList from "./ResultList";

const RegionFilter: React.FC<{ isOpen: boolean }> = ({ isOpen }) => {
	const [selectedRegion, setSelectedRegion] = useState<any[]>([]);
	const [center, setCenter] = useState<[number, number]>([0, 0]);
	const [zoom, setZoom] = useState<number>(2);
	const [isPolygon, setIsPolygon] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);
	const [foundPlaces, setFoundPlaces] = useState<any[]>([]);
	const [selectedPlace, setSelectedPlace] = useState<any>(null);

	useEffect(() => {
		if (isOpen) {
			setTimeout(() => {
				window.dispatchEvent(new Event("resize"));
			}, 100);
		}
	}, [isOpen]);

	const handleSearch = async (placeName: string) => {
		if (!placeName) return;

		setLoading(true);
		try {
			const response = await axios.get(
				`https://nominatim.openstreetmap.org/search`,
				{
					params: {
						q: placeName,
						format: "json",
						polygon_geojson: 1
					}
				}
			);

			if (response.data.length > 0) {
				setFoundPlaces(response.data);
			} else {
				alert("Local não encontrado");
				setFoundPlaces([]);
			}
		} catch (error) {
			console.error("Erro ao buscar o local:", error);
			alert("Erro ao buscar o local");
			setFoundPlaces([]);
		} finally {
			setLoading(false);
		}
	};

	const selectPlace = (place: any) => {
		setSelectedPlace(place);
		if (place.geojson && place.geojson.type === "Polygon") {
			const coordinates = place.geojson.coordinates[0].map(
				(coord: [number, number]) => ({
					lat: coord[1],
					lng: coord[0]
				})
			);
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

	return (
		<Card className="mb-3">
			<Card.Body>
				<Row>
					<Col md={8}>
						<MapView
							center={center}
							zoom={zoom}
							selectedRegion={selectedRegion}
							isPolygon={isPolygon}
							isOpen={isOpen}
						/>
					</Col>
					<Col md={4}>
						<SearchBar onSearch={handleSearch} loading={loading} />
						<ResultList
							places={foundPlaces}
							selectedPlace={selectedPlace}
							onSelectPlace={selectPlace}
						/>
					</Col>
				</Row>
			</Card.Body>
		</Card>
	);
};

export default RegionFilter;
