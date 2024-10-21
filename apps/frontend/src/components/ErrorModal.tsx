import React from 'react';
import { Modal, Button } from 'react-bootstrap';

interface ErrorModalProps {
    show: boolean;
    handleClose: () => void;
    errorMessage: string;
}

const ErrorModal: React.FC<ErrorModalProps> = ({ show, handleClose, errorMessage }) => {
    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Login Error</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>{errorMessage}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ErrorModal;
