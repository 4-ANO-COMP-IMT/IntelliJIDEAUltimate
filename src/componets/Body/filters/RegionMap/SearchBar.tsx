import React, { useState } from "react";
import { Form, Button, Spinner } from "react-bootstrap";

interface SearchBarProps {
        onSearch: (placeName: string) => void;
        loading: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, loading }) => {
        const [placeName, setPlaceName] = useState<string>("");

        const handleSearch = () => {
                onSearch(placeName);
        };

        return (
                <Form.Group controlId="regionSearchBar">
                        <Form.Control
                                type="text"
                                placeholder="Nome do lugar (País, Estado, etc.)"
                                value={placeName}
                                onChange={(e) => setPlaceName(e.target.value)}
                                className="mb-2"
                        />
                        <Button
                                variant="primary"
                                onClick={handleSearch}
                                className="mb-2"
                                disabled={loading}
                        >
                                {loading ? (
                                        <Spinner animation="border" size="sm" />
                                ) : (
                                        "Buscar"
                                )}
                        </Button>
                </Form.Group>
        );
};

export default SearchBar;
