import React, { useState } from 'react';
import { Button, Collapse, Form, Row, Col } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Select, { ActionMeta, MultiValue } from 'react-select';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const FilterCollapse: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [selectedClasses, setSelectedClasses] = useState<any[]>([]);
    const [selectedTags, setSelectedTags] = useState<any[]>([]);
    const [selectedRegion, setSelectedRegion] = useState<any>(null);

    const classOptions = [
        { value: 1, label: 'Classe 1' },
        { value: 2, label: 'Classe 2' },
        { value: 3, label: 'Classe 3' },
        // Adicione mais opções conforme necessário
    ];

    const tagOptions = [
        { value: 'Tag1', label: 'Tag 1' },
        { value: 'Tag2', label: 'Tag 2' },
        { value: 'Tag3', label: 'Tag 3' },
        // Adicione mais opções conforme necessário
    ];

    const MapEvents = () => {
        useMapEvents({
            click(e: { latlng: any; }) {
                setSelectedRegion(e.latlng);
            },
        });
        return null;
    };

    return (
        <>
            <Button
                onClick={() => setOpen(!open)}
                aria-controls="example-collapse-text"
                aria-expanded={open}
                className="mb-3"
            >
                Filtros
            </Button>
            <Collapse in={open}>
                <div id="example-collapse-text">
                    <Form>
                        {/* Filtro de Data */}
                        <Form.Group controlId="dateFilter">
                            <Form.Label>Data</Form.Label>
                            <Row>
                                <Col>
                                    <Form.Label>Início</Form.Label>
                                    <DatePicker
                                        selected={startDate}
                                        onChange={(date) => setStartDate(date)}
                                        className="form-control"
                                        placeholderText="Data de Início"
                                    />
                                </Col>
                                <Col>
                                    <Form.Label>Fim</Form.Label>
                                    <DatePicker
                                        selected={endDate}
                                        onChange={(date) => setEndDate(date)}
                                        className="form-control"
                                        placeholderText="Data de Fim"
                                    />
                                </Col>
                            </Row>
                        </Form.Group>
                        
                        {/* Filtro de Classe */}
                        <Form.Group controlId="classFilter">
                            <Form.Label>Classe</Form.Label>
                            <Select
                                isMulti
                                options={classOptions}
                                value={selectedClasses}
                                onChange={(newValue: any) => setSelectedClasses(newValue)}
                                placeholder="Selecione as classes"
                            />
                        </Form.Group>
                        
                        {/* Filtro de Região */}
                        <Form.Group controlId="regionFilter">
                            <Form.Label>Região</Form.Label>
                            <MapContainer style={{ height: '300px' }}>
                                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                                {selectedRegion && <Marker position={selectedRegion} />}
                                <MapEvents />
                            </MapContainer>
                        </Form.Group>
                        
                        {/* Filtro de Tags Especiais */}
                        <Form.Group controlId="tagsFilter">
                            <Form.Label>Tags Especiais</Form.Label>
                            <Select
                                isMulti
                                onChange={(newValue: MultiValue<any>, actionMeta: ActionMeta<any>) => setSelectedTags(newValue as any[])}
                                placeholder="Digite as tags"
                            />
                        </Form.Group>
                        
                        {/* Filtro de Flag */}
                        <Form.Group controlId="flagFilter">
                            <Form.Label>Flag</Form.Label>
                            <Form.Check type="checkbox" label="Ativar flag" />
                        </Form.Group>
                        
                        {/* Filtro de Tipo */}
                        <Form.Group controlId="typeFilter">
                            <Form.Label>Tipo</Form.Label>
                            <Form.Control type="text" placeholder="Digite o tipo" />
                        </Form.Group>
                    </Form>
                </div>
            </Collapse>
        </>
    );
};

export default FilterCollapse;
