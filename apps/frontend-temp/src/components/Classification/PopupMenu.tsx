import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { classes } from 'config/classes';

interface PopupMenuProps {
  x: number;
  y: number;
  onConfirm: (class_id: number) => void;
}

const PopupMenu: React.FC<PopupMenuProps> = ({ x, y, onConfirm }) => {
  return (
    <Card
      style={{
        position: 'absolute',
        top: y,
        left: x,
        zIndex: 10,
        minWidth: '200px',
      }}
    >
      <Card.Body>
        <Card.Title>Select Class</Card.Title>
        <div className="d-flex flex-column">
          {classes.map((cls) => (
            <Button
              key={cls.id}
              onClick={() => onConfirm(cls.id)}
              className="mb-2 w-100"
              style={{
                backgroundColor: cls.color,
                borderColor: cls.color,
                color: '#fff',
              }}
            >
              {cls.name}
            </Button>
          ))}
        </div>
      </Card.Body>
    </Card>
  );
};

export default PopupMenu;
