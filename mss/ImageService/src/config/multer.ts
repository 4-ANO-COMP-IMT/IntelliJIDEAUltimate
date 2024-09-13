import multer, { StorageEngine } from 'multer';
import { Request } from 'express';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';

// Função para configurar o multer
export function setupMulter(): multer.Multer {
  const storage: StorageEngine = multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void): void => {
      // Define a pasta onde os arquivos serão armazenados
      cb(null, path.join(__dirname,'..', '..', 'upload'));
    },
    filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void): void => {
      const extension = path.extname(file.originalname);
      const uniqueName = uuidv4() + extension; // Define o nome do arquivo com UUID
      cb(null, uniqueName);
    }
  });

  return multer({ storage: storage });
}
