import React from 'react';
import { Button, ButtonGroup, Container, Row, Col, Spinner } from 'react-bootstrap';
import { useAppContext } from './AppContext';
import { useToolContext } from './ToolContext';

const ClassificationTool: React.FC = () => {
  const { selectedTool, setSelectedTool } = useToolContext();
  const { sendRectangles, loadNextImage, is_loading, is_sending, rectangles } = useAppContext();

  const handleSend = async () => {
    await sendRectangles();
    await loadNextImage();
  };

  return (
    <Container fluid className="mt-3">
      <Row>
        {/* Left-aligned Tool Buttons */}
        <Col className="d-flex justify-content-start">
          <ButtonGroup className="mb-3">
            <Button
              variant={selectedTool === 'draw' ? 'primary' : 'outline-primary'}
              onClick={() => setSelectedTool('draw')}
            >
              Draw Rectangle
            </Button>
            <Button
              variant={selectedTool === 'erase' ? 'danger' : 'outline-danger'}
              onClick={() => setSelectedTool('erase')}
            >
              Erase Rectangle
            </Button>
          </ButtonGroup>
        </Col>

        {/* Right-aligned Send Button */}
        <Col className="d-flex justify-content-end">
          <Button
            variant="success"
            onClick={handleSend}
            disabled={is_loading || is_sending}
          >
            {is_sending ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />{' '}
                Sending...
              </>
            ) : (
              'Send Rectangles'
            )}
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ClassificationTool;
