import React from 'react';
import { Modal, Button, ListGroup } from 'react-bootstrap';
import { useModal } from '../contexts/ModalContext';
import ImageCanvas from './ImageCanvas';

const ImageModal: React.FC = () => {
  const { isOpen, selectedCard, closeModal } = useModal();

  if (!selectedCard) return null;

  return (
    <Modal show={isOpen} onHide={closeModal} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>{selectedCard.user_name}'s Image</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
          {/* Ajusta o tamanho do canvas para se adaptar ao modal */}
          <div style={{ width: '100%', maxHeight: '100%', overflow: 'hidden' }}>
            <ImageCanvas
              imageUrl={selectedCard.image_url}
              rectangles={selectedCard.rectangles}
              width={900}  // Largura do canvas ajustada ao modal
              height={500} // Altura do canvas ajustada ao modal
            />
          </div>
        </div>

        {/* Timestamp centralizado */}
        <p className="text-center mt-3">Timestamp: {new Date(selectedCard.timestamp).toLocaleString()}</p>

        <h5>Rectangles:</h5>
        <ListGroup>
          {selectedCard.rectangles.map((rect, index) => (
            <ListGroup.Item key={index}>
              Rect {index + 1}: [x: {rect.x}, y: {rect.y}, width: {rect.width}, height: {rect.height}, class_id: {rect.class_id}]
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Fechar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ImageModal;
