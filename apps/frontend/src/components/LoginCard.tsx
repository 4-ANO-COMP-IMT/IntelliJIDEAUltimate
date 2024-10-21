import React from 'react';
import { Card } from 'react-bootstrap';
import LoginForm from './LoginForm';
import SocialMediaLinks from './SocialMediaLinks';

const LoginCard: React.FC = () => {
    return (
        <Card className="bg-dark text-white" style={{ borderRadius: '1rem' }}>
            <Card.Body className="p-5 text-center">
                <div className="mb-md-5 mt-md-4 pb-5">
                    <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                    <p className="text-white-50 mb-5">Please enter your login and password!</p>
                    <LoginForm />
                    <SocialMediaLinks />
                </div>  
                <div>
                    <p className="mb-0">
                        Don't have an account?{' '}
                        <a href="#!" className="text-white-50 fw-bold">
                            Sign Up
                        </a>
                    </p>
                </div>
            </Card.Body>
        </Card>
    );
};

export default LoginCard;
