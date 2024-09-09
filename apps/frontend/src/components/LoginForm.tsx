import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useAuth } from './AuthContext';
import ErrorModal from './ErrorModal';

const LoginForm: React.FC = () => {
    const { login, error, setError } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showErrorModal, setShowErrorModal] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await login(email, password);
    };

    useEffect(() => {
        if (error) {
            setShowErrorModal(true);
        }
    }, [error]);

    const handleCloseErrorModal = () => {
        setShowErrorModal(false);
        setError(null);
    };

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="form-outline form-white mb-4">
                    <Form.Label htmlFor="typeEmailX">Email</Form.Label>
                    <Form.Control
                        type="email"
                        id="typeEmailX"
                        className="form-control form-control-lg"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="form-outline form-white mb-4">
                    <Form.Label htmlFor="typePasswordX">Password</Form.Label>
                    <Form.Control
                        type="password"
                        id="typePasswordX"
                        className="form-control form-control-lg"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>

                <p className="small mb-5 pb-lg-2">
                    <a className="text-white-50" href="#!">
                        Forgot password?
                    </a>
                </p>

                <Button variant="outline-light" className="btn-lg px-5" type="submit">
                    Login
                </Button>
            </Form>

            <ErrorModal
                show={showErrorModal}
                handleClose={handleCloseErrorModal}
                errorMessage={error || ''}
            />
        </>
    );
};

export default LoginForm;
