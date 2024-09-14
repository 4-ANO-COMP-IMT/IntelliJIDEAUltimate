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
    
    const formData = new FormData();
    files.forEach((fileData) => {
      formData.append('images', fileData.file);
    });
    
    try {
      const response = await axios.post('http://localhost:3003/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Imagens enviadas com sucesso:', response.data);
      alert("Images uploaded");
    } catch (error: any) {
      alert("Error: Upload failed");
      if (error.response) {
        // O servidor respondeu com um código de status fora da faixa 2xx
        console.error('Status:', error.response.status);
        console.error('Mensagem de erro:', error.response.data.message); // Mensagem de erro enviada pelo backend
      } else if (error.request) {
        // A requisição foi feita, mas não houve resposta
        console.error('Nenhuma resposta recebida:', error.request);
      } else {
        // Algum outro erro ocorreu na configuração da requisição
        console.error('Erro na configuração:', error.message);
      }
    }
   
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
