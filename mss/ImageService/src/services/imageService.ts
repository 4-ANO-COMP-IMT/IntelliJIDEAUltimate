import { pool } from '@intelij-ultimate/postgres-utility';
import { Image, ImageDB } from '@intelij-ultimate/image-utility';
import { createImageInDB } from '@intelij-ultimate/image-utility'

export async function insertImages(image: Image): Promise<ImageDB|null> {
    try {
        const imageDB = await createImageInDB(image);
        return imageDB;
    } catch (error) {
        console.log("Não foi possível inserira imagem: " + image);
        return null;
    }
}