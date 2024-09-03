export type RectangleDB = {
    id_serial: number;
    image_id: number;
    class_name: string;
    center_x: number;
    center_y: number;
    width: number;
    height: number;
    user_id: number;
};

export type RectangleReq = {
    image_id: number;
    class_name: string;
    center_x: number;
    center_y: number;
    width: number;
    height: number;
};

/* 
CREATE TABLE rectangles (
    id_serial SERIAL PRIMARY KEY,       -- Coluna id_serial como chave primária, com incremento automático
    image_id INTEGER NOT NULL,          -- Coluna image_id do tipo inteiro
    class_name VARCHAR(40) NOT NULL,    -- Coluna class_name do tipo string (texto) com comprimento máximo de 255 caracteres
    center_x NUMERIC NOT NULL,          -- Coluna center_x do tipo numérico (pode especificar precisão se necessário)
    center_y NUMERIC NOT NULL,          -- Coluna center_y do tipo numérico
    width NUMERIC NOT NULL,             -- Coluna width do tipo numérico
    height NUMERIC NOT NULL,            -- Coluna height do tipo numérico
    user_id INTEGER NOT NULL            -- Coluna id_usuario do tipo inteiro
);
*/