
CREATE TABLE users (
    user_id [PRIMARY KEY],
    is_active,
);


CREATE TABLE allocation_images (
    image_id [PRIMARY KEY],
    image_url VARCHAR(200) NOT NULL,
    classification_status VARCHAR(50) DEFAULT 'pending'  -- Estado da reserva (ex:'pending' , 'reserved', 'classified')
    user_id REFERENCES users(id) DEFAULT NULL, 
    timestamp_reservation TIMESTAMP DEFAULT NULL,
    timestamp_classification TIMESTAMP DEFAULT NULL,
);



CREATE TABLE rectangles (
    rectangle_id [PRIMARY KEY],       		-- Coluna id_serial como chave primária, com incremento automático
    image_id INTEGER NOT NULL,          -- Coluna image_id do tipo inteiro
    class_name VARCHAR(40) NOT NULL,    -- Coluna class_name do tipo string (texto) com comprimento máximo de 255 caracteres
    center_x NUMERIC NOT NULL,          -- Coluna center_x do tipo numérico (pode especificar precisão se necessário)
    center_y NUMERIC NOT NULL,          -- Coluna center_y do tipo numérico
    width NUMERIC NOT NULL,             -- Coluna width do tipo numérico
    height NUMERIC NOT NULL,            -- Coluna height do tipo numérico
);


quado_chega_imagem(image_id,image_url){

    insere na tabela imagens (image_id,image_url) resto default

}


quando_for_requisitar_uma_imagem_para_classificar (user_id)
{
    busca na tabela imagens usando user_id uma imagem classification_status = 'reserved'
    caso ache 
        retorna a (image_id,image_url) achado
    caso não ache 
        busca na tabela imagens classification_status = 'pending'
        caso ache
            começa transaction
            altera classification_status para 'reserved'
            altera timestamp_reservation para data atual
            altera user_id para o do usuario
            finaliza transaction
            retorna a (image_id,image_url) achado
            
        caso não ache
            mensagem para o usuario ("não a imagens disponiveis")
}


quando_o_usuario_classifica_a_imagem(image_id,rectangles_list){
    começa transaction
    altera classification_status para 'classified'
    altera timestamp_classification para data atual

    para cada retangulo em rectangles_list
        insere na tabela rectangles (retangulo)

    finaliza transaction
}