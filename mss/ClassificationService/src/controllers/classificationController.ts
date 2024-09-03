import { Request, Response, NextFunction } from 'express';
import { RectangleReq, RectangleDB } from '../interfaces';
import { insertClassification } from '../services/classificationService'
import { getUserIdFromToken } from '@intelij-ultimate/session-utility'

export const createClassification = async function (req: Request, res: Response) {
    const session_token = req.headers['authorization']?.split(' ').pop();
    if (!session_token) return res.status(401).json({ message: 'No token provided' });

    let user_id = await getUserIdFromToken(session_token);
    if(!user_id) return res.status(401).json({ message: 'Invalid token' });

    let rectangles: RectangleReq[] = req.body.rectangles;
    let insertedRectangles: RectangleDB[] = await insertClassification(rectangles, user_id);

    console.log("classificationController: classificação inserida");
    res.status(200).json({message: "Classificação inserida", classificacao: insertedRectangles});
}

export const getClassificationById = function (req: Request, res: Response) {
    // Lógica para lidar com requisições GET para /classification/:id
    // Buscar uma classificação específica por ID
    const { id } = req.params;

}