import { Request, Response } from 'express';

export const allocateController = (req: Request, res: Response) => {

    const user_id = req.body.user_id;
    const buffer_size = req.body.buffer_size;


    if (!user_id) {
        return res.status(400).json({ message: 'No user_id provided' });
    }

    if (!buffer_size) {
        return res.status(400).json({ message: 'No buffer_size provided' });
    }



    //consulta quais images estão alocadas para o usuário
    // conta quantas imagens estão alocadas para o usuário
    // se a quantidade de imagens alocadas for maior que o buffer_size, retorna as imagens alocadas e desaloca as imagens que excedem o buffer_size
    // se a quantidade de imagens alocadas for menor que o buffer_size, aloca imagens para o usuário até que a quantidade de imagens alocadas seja igual ao buffer_size
    // retorna as imagens alocadas para o usuário

    let images_allocated = getImagesAllocatedFromUserID(user_id)
    let images_allocated_count = images_allocated.length
    if (images_allocated_count > buffer_size) {
        let images_to_deallocate = images_allocated.slice(buffer_size)
        deallocateImages(images_to_deallocate)
        images_allocated = images_allocated.slice(0, buffer_size)
    }
    else if (images_allocated_count < buffer_size) {
        const quantity = buffer_size - images_allocated_count
        const new_images_allocated = allocateImagesByQuantityForUser(quantity, user_id)
        images_allocated = images_allocated.concat(new_images_allocated)
    }

    return res.json({ images: images_allocated });
};