//getImagesAllocatedFromUserID  receives userid and returns an array of images allocated for a given user
//deallocateImages receives an array of images and deallocates them returning nothing
//allocateImagesByQuantityForUser receives a quantity and a user id and allocates that quantity of images for the user returning an array of images allocated
//deallocateImageByToken receives an image token and deallocates it returning nothingq

import * as allocation_utility from "@intelij-ultimate/allocation-utility";

export async function getImagesAllocatedFromUserID(user_id: number): Promise<allocation_utility.ImageAllocated[]> {
    return await allocation_utility.getAllImagesAllocatedByUserId(user_id); 
}

export async function deallocateImages(images: allocation_utility.ImageAllocated[]): Promise<void> {
    await Promise.all(images.map(async (image) => {
        await allocation_utility.deleteImageAllocated(image.allocation_id);
    }));
}


async function allocateImagesToUser(userId: number, numberOfImages: number) {
    const client = await pool.connect(); // Obter um cliente do pool
  
    try {
      // Inicia uma transação
      await client.query('BEGIN');
      
      // Seleciona imagens disponíveis
      const availableImagesQuery = `
        SELECT i.id 
        FROM images i
        LEFT JOIN image_reservation ir ON i.id = ir.image_id
        WHERE ir.image_id IS NULL
        LIMIT $1
        FOR UPDATE
      `;
      
      const result = await client.query(availableImagesQuery, [numberOfImages]);
      const images = result.rows;
      
      if (images.length === 0) {
        throw new Error('No available images to allocate.');
      }
  
      // Inserir reservas para o usuário
      const insertReservationQuery = `
        INSERT INTO image_reservation (user_id, image_id, reserved_at, status)
        VALUES ($1, $2, NOW(), 'active')
      `;
      
      for (const image of images) {
        await client.query(insertReservationQuery, [userId, image.id]);
      }
  
      // Confirma a transação
      await client.query('COMMIT');
      console.log('Images successfully allocated');
    } catch (error) {
      // Se houver erro, desfaz a transação
      await client.query('ROLLBACK');
      console.error('Error allocating images:', error);
    } finally {
      client.release(); // Libera o cliente de volta para o pool
    }
}




export async function deallocateImageByToken(image_token: number): Promise<void> {
    const image = await allocation_utility.getImageAllocatedByImageId(image_token);
    await allocation_utility.deleteImageAllocated(image!.allocation_id);
}

