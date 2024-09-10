import React, { useState } from 'react';
import { Container, Button, Row, Col, ListGroup, Image } from 'react-bootstrap';
import { useDropzone } from 'react-dropzone';
import { FaFileUpload, FaTrash, FaCloudUploadAlt } from 'react-icons/fa';
import axios from 'axios';

interface ImageData {
  file: File;
  preview: string;
  size: number;
  dimensions: { width: number; height: number };
}

const ImageUploadPage: React.FC = () => {
  const [files, setFiles] = useState<ImageData[]>([]);

  const onDrop = (acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const img = new window.Image(); // Aqui corrigimos para evitar conflito
        img.src = e.target?.result as string;
        img.onload = () => {
          const newFile: ImageData = {
            file,
            preview: img.src,
            size: file.size,
            dimensions: { width: img.width, height: img.height },
          };
          setFiles((prevFiles) => [...prevFiles, newFile]);
        };
      };
      reader.readAsDataURL(file);
    });
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpeg', '.jpg'],
      'image/png': ['.png'],
    },
    multiple: true,
  });

  const handleClear = () => {
    setFiles([]);
  };

  const handleSend = async () => {
    // Aqui é onde você faria a requisição para o servidor
    // Exemplo de como enviar as imagens utilizando axios (comentado):
    /*
    const formData = new FormData();
    files.forEach((fileData) => {
      formData.append('images', fileData.file);
    });
    
    try {
      const response = await axios.post('http://localhost:3000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Imagens enviadas com sucesso:', response.data);
    } catch (error) {
      console.error('Erro ao enviar imagens:', error);
    }
    */
  };

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col md={8}>
          <div
            {...getRootProps()}
            className="border p-5 text-center mb-4"
            style={{
              borderStyle: 'dashed',
              borderRadius: '10px',
              cursor: 'pointer',
              backgroundColor: '#f9f9f9',
            }}
          >
            <input {...getInputProps()} />
            <FaCloudUploadAlt size={50} className="text-muted mb-3" />
            <p>Arraste e solte as imagens aqui, ou clique para selecionar</p>
          </div>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col md={8}>
          <Button
            variant="primary"
            className="mb-3"
            onClick={() => (document.querySelector('input[type="file"]') as HTMLInputElement)?.click()}
          >
            <FaFileUpload /> Selecionar Mais Imagens
          </Button>

          <Button variant="danger" className="mb-3 ms-3" onClick={handleClear}>
            <FaTrash /> Limpar
          </Button>
          <Button variant="success" className="mb-3 ms-3" onClick={handleSend}>
            Enviar
          </Button>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col md={8}>
          <div
            style={{
              maxHeight: '300px',
              overflowY: 'auto',
              border: '1px solid #ddd',
              borderRadius: '10px',
              padding: '10px',
              backgroundColor: '#f9f9f9',
            }}
          >
            <ListGroup>
              {files.map((fileData, index) => (
                <ListGroup.Item key={index} className="d-flex align-items-center">
                  <Image
                    src={fileData.preview}
                    alt="preview"
                    width={50}
                    height={50}
                    style={{ objectFit: 'cover', marginRight: '10px' }}
                  />
                  <div>
                    <p className="mb-0">
                      <strong>{fileData.file.name}</strong> - {(fileData.size / 1024).toFixed(2)} KB
                    </p>
                    <p className="mb-0">
                      Dimensões: {fileData.dimensions.width} x {fileData.dimensions.height}px
                    </p>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ImageUploadPage;
