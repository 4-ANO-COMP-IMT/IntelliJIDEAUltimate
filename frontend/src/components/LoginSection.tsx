import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import LoginCard from './LoginCard';

const LoginSection: React.FC = () => {
    return (
        <section className="vh-100 gradient-custom">
            <Container className="py-5 h-100">
                <Row className="d-flex justify-content-center align-items-center h-100">
                    <Col xs={12} md={8} lg={6} xl={5}>
                        <LoginCard />
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default LoginSection;
