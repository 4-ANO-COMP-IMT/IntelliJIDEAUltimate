import React from 'react';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import {Button, ModalDialog, ModalTitle} from "react-bootstrap";

interface ImageModalProps {
    isOpen: boolean;
    toggle: () => void;
    imgSrc: string;
}

const ImageModal: React.FC<ImageModalProps> = ({ isOpen, toggle, imgSrc }) => {
    
    
    return (
        <Modal isOpen={isOpen} toggle={toggle} centered size="lg">
            <ModalHeader toggle={toggle} className="border-0">
            </ModalHeader>
            <ModalBody className="p-0 d-flex justify-content-center align-items-center">
                <img src={imgSrc} alt="Modal Image" className="img-fluid w-100 h-100" style={{ objectFit: 'cover' }} />
            </ModalBody>
            <ModalFooter className="border-0">
                <Button variant="secondary">
                    Classe 1
                    <ModalDialog>
                        <ModalHeader>
                            <ModalTitle>Classe 1</ModalTitle>
                        </ModalHeader>
                        <ModalBody>
                            <p>Classe 1</p>
                        </ModalBody>
                        <ModalFooter>
                            <Button variant="secondary" onClick={toggle}>
                                Close
                            </Button>
                        </ModalFooter>
                    </ModalDialog>
                </Button>
                
                <Button variant="secondary" onClick={toggle}>
                    Classe 2
                </Button>
                
                <Button variant="secondary" onClick={toggle}>
                    Classe 3
                </Button>
            </ModalFooter>
        </Modal>
    );
}

export default ImageModal;
