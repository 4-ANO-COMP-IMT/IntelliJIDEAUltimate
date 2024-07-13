import React from 'react';
import ImageFrame from './ImageFrame/ImageFrame';
import { Container } from 'react-bootstrap';

const Body: React.FC = () => {
    return (
        <div className="container">
            <div className="filter-section">
                {/* Filter section content */}
            </div>
            <div className="tools">
                {/* Tools content */}
            </div>
            
            <Container fluid style={{ height: '100vh', padding: 0 }}>
                    <ImageFrame />
            </Container>

            <p>Body conten: {}</p>
            <div className="button-bar">
                {/* Button bar content */}
            </div>
        </div>
    );
};

export default Body;