import React from 'react';
import { Card } from 'react-bootstrap';
import { motion } from 'framer-motion';
import './CardComponent.css';
import { useModal } from '../../../contexts/ModalContext';
import { Rectangle } from 'components/rectangles/interfaces';
import ImageCanvas from '../../ImageCanvas';

export interface CardInfo {
  image_url: string;
  user_name: string;
  rectangles: Rectangle[];
  timestamp: Date;
}

interface CardComponentProps {
  item: CardInfo;
  x: number;
  y: number;
}

const CardComponent: React.FC<CardComponentProps> = ({ item, x, y }) => {
  const { openModal } = useModal();

  const handleCardClick = () => {
    openModal(item);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="mb-4 shadow-sm card-container" onClick={handleCardClick} style={{ cursor: 'pointer' }}>
        <div className="card-image-container">
          <ImageCanvas 
            imageUrl={item.image_url} 
            rectangles={item.rectangles}
            width={300}  // Ajusta o tamanho do canvas no card
            height={200}
          />
        </div>
        <Card.Body className="text-center">
          <Card.Title>{item.user_name}</Card.Title>
          <p>
            Position: ({x}, {y})
          </p>
          <p>{item.timestamp.toLocaleDateString()}</p>
        </Card.Body>
      </Card>
    </motion.div>
  );
};

export default CardComponent;
