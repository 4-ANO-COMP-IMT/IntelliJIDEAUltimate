import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { motion } from 'framer-motion';
import './CardComponent.css';
import { useModal } from '../../../contexts/ModalContext';
import { Rectangle } from 'components/rectangles/interfaces';
import ImageCanvas from '../../ImageCanvas';
import axios from 'axios';
import { classes } from 'config/classes';

export interface CardInfo {
  image_id: number,
  image_url: string,
  classification_status: string,
  user_id: number,
  timestamp_reservation: string,
  timestamp_classification: string
}

interface CardComponentProps {
  cardInfo: CardInfo;
}

const CardComponent: React.FC<{cardInfo:CardInfo}> = ({cardInfo}) => {
  const { openModal } = useModal();

  const [rectangles, setRectangles] = useState<Rectangle[]>([]);

  useEffect(() => {
    const fetchClassifications = async () => {
      const response = await axios.get(`http://localhost:30002/api/classification/${cardInfo.image_id}`);
      
      const classifications:{
        "rectangle_id": number,
        "image_id": number,
        "class_name": string,
        "center_x": string,
        "center_y": string,
        "width": string,
        "height": string
      }[] = response.data.classifications;

      const rectList: Rectangle[] = classifications.map((classification) => ({
        x: parseFloat(classification.center_x),
        y: parseFloat(classification.center_y),
        width: parseFloat(classification.width),
        height: parseFloat(classification.height),
        class_id: classes.find((item)=>item.name === classification.class_name)!.id
      }));

      setRectangles(rectList);
    };
    
    fetchClassifications();
  }, [cardInfo]);

  const handleCardClick = () => {
    openModal(cardInfo);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="mb-4 shadow-sm card-container" onClick={handleCardClick} style={{ cursor: 'pointer' }}>
        {/* Centralizar o canvas horizontalmente */}
        <div style={{ display: 'flex', justifyContent: 'center', maxHeight: '200px', overflow: 'hidden' }}>
          <ImageCanvas
            imageUrl={cardInfo.image_url}
            rectangles={rectangles}
            width={300}  // Ajusta o tamanho do canvas no card
            height={200}
          />
        </div>
        <Card.Body className="text-center">
          <Card.Title>{'user ID: ' + cardInfo.user_id}</Card.Title>
          <p>{new Date(cardInfo.timestamp_classification).toLocaleString()}</p>
        </Card.Body>
      </Card>
    </motion.div>
  );
};

export default CardComponent;
