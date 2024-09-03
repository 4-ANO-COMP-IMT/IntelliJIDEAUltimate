import { RectangleDB, RectangleReq } from '../interfaces';
import { insertRectangleInDB } from '../queries'

export async function insertClassification(rectangles: RectangleReq[], user_id: number): Promise<RectangleDB[]> {
    
    const promises = rectangles.map(rect => insertRectangleInDB(rect, user_id));
    
    // Aguarda que todas as promessas sejam resolvidas e armazena os resultados
    const result = await Promise.all(promises);

    return result;
}