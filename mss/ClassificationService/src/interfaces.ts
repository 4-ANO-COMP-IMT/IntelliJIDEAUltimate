export type RectangleDB = {
    id_serial: number;
    image_id: number;
    class_name: string;
    center_x: number;
    center_y: number;
    width: number;
    height: number;
};

export type RectangleReq = {
    class_name: string;
    center_x: number;
    center_y: number;
    width: number;
    height: number;
};

export interface AllocationImageDB {
    image_id: number;
    image_url: string;
    classification_status: string;
    user_id: number | null;
    timestamp_reservation: Date | null;
    timestamp_classification: Date | null;
}

/* 
CREATE TABLE rectangles (
    rectangle_id SERIAL PRIMARY KEY,       -- Coluna id_serial como chave primária, com incremento automático
    image_id INTEGER NOT NULL,          -- Coluna image_id do tipo inteiro
    class_name VARCHAR(40) NOT NULL,    -- Coluna class_name do tipo string (texto) com comprimento máximo de 255 caracteres
    center_x NUMERIC NOT NULL,          -- Coluna center_x do tipo numérico (pode especificar precisão se necessário)
    center_y NUMERIC NOT NULL,          -- Coluna center_y do tipo numérico
    width NUMERIC NOT NULL,             -- Coluna width do tipo numérico
    height NUMERIC NOT NULL             -- Coluna height do tipo numérico
);

CREATE TABLE allocation_images (
    image_id SERIAL PRIMARY KEY,
    image_url VARCHAR(200) NOT NULL,
    classification_status VARCHAR(50) DEFAULT 'pending',  -- Estado da reserva (ex:'pending' , 'reserved', 'classified')
    user_id INTEGER DEFAULT NULL, 
    timestamp_reservation TIMESTAMP DEFAULT NULL,
    timestamp_classification TIMESTAMP DEFAULT NULL
);



*/