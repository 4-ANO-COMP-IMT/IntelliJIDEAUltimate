import React from 'react';
import ImageFrame from './ImageFrame/ImageFrame';
import { Button, Container, Dropdown, DropdownButton, Form, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import Toolbar from './toolbar';
import FilterDropdown from './FilterDropDown';
import FilterCollapse from './filters/FilterCollapse';

const Body: React.FC = () => {
    return (
        <div className="container">
            <div className="filter-section">
                <FilterDropdown />
                <FilterCollapse />
            </div>


            <div className="tools">
                <Toolbar />
            </div>
            
            <Container fluid style={{ height: '100vh', padding: 0 }}>
                <ImageFrame />
            </Container>

            <div className="button-bar d-flex justify-content-center">
                <Button variant="primary">Button 1</Button>
                <Button variant="secondary">Button 2</Button>
                <Button variant="success">Button 3</Button>
                {/* Add more buttons as needed */}
            </div>
        </div>
    );
};

export default Body;
