import React, { useEffect, useState } from 'react';
import { Modal, Button, ListGroup, Spinner, Row, Col } from 'react-bootstrap';
import { useModal } from '../contexts/ModalContext';
import ImageCanvas from './ImageCanvas';
import axios from 'axios';
import { Rectangle } from 'components/rectangles/interfaces';
import { classes } from 'config/classes';

const ImageModal: React.FC = () => {
  const { isOpen, selectedCard, closeModal } = useModal();

  const [rectangles, setRectangles] = useState<Rectangle[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchClassifications = async () => {
      if (!selectedCard) return;

      try {
        setIsLoading(true);
        const response = await axios.get(
          `http://localhost:3002/api/classification/${selectedCard.image_id}`
        );

        const classifications: {
          rectangle_id: number;
          image_id: number;
          class_name: string;
          center_x: string;
          center_y: string;
          width: string;
          height: string;
        }[] = response.data.classifications;

        const rectList: Rectangle[] = classifications.map((classification) => {
          const classItem = classes.find((item) => item.name === classification.class_name);
          return {
            x: parseFloat(classification.center_x),
            y: parseFloat(classification.center_y),
            width: parseFloat(classification.width),
            height: parseFloat(classification.height),
            class_id: classItem ? classItem.id : 0, // Definir um valor padrão se a classe não for encontrada
          };
        });

        setRectangles(rectList); // Corrigido para definir rectList
      } catch (error) {
        console.error('Erro ao buscar classificações:', error);
        // Opcional: adicionar lógica para lidar com erros, como exibir uma mensagem ao usuário
      } finally {
        setIsLoading(false);
      }
    };

    fetchClassifications();
  }, [selectedCard]);

  if (!selectedCard) return null;

  const reservedDate = new Date(selectedCard.timestamp_reservation);
  const classificatedDate = new Date(selectedCard.timestamp_classification);
  const classificationTimeSpan = classificatedDate.getTime() - reservedDate.getTime();

  // Formatar o tempo de classificação para minutos e segundos
  const totalSeconds = Math.floor(classificationTimeSpan / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const milliseconds = classificationTimeSpan % 1000;
  const formattedTime = `${minutes}m ${seconds}.${milliseconds}s`;

  // Formatar as datas para uma representação mais amigável
  const formattedReservedDate = new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(reservedDate);

  const formattedClassificatedDate = new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(classificatedDate);

  return (
    <Modal show={isOpen} onHide={closeModal} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>{selectedCard.user_id}'s Image</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className="justify-content-center">
          <Col xs={12}>
            {/* Ajusta o tamanho do canvas para se adaptar ao modal */}
            <div style={{ width: '100%', maxHeight: '500px', overflow: 'hidden' }}>
              <ImageCanvas
                imageUrl={selectedCard.image_url}
                rectangles={rectangles}
                width={900} // Largura do canvas ajustada ao modal
                height={500} // Altura do canvas ajustada ao modal
              />
            </div>
          </Col>
        </Row>

        {/* Timestamps centralizados e formatados */}
        <Row className="text-center mt-3">
          <Col>
            <p>
              <strong>Reserved at:</strong> {formattedReservedDate}
            </p>
            <p>
              <strong>Classificated at:</strong> {formattedClassificatedDate}
            </p>
            <p>
              <strong>Time to Classificate:</strong> {formattedTime}
            </p>
          </Col>
        </Row>

        {/* Lista de Retângulos */}
        <h5>Rectangles:</h5>
        {isLoading ? (
          <div className="d-flex justify-content-center align-items-center" style={{ height: '100px' }}>
            <Spinner animation="border" role="status" variant="primary">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
            <span className="ms-2">Loading rectangles...</span>
          </div>
        ) : (
          <ListGroup>
            {rectangles.map((rect, index) => (
              <ListGroup.Item key={index}>
                <strong>Rect {index + 1}:</strong> [x: {rect.x}, y: {rect.y}, width: {rect.width}, height: {rect.height}, class_id: {rect.class_id}]
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
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
