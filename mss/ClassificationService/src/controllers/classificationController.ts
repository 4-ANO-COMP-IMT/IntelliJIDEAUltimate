import { Request, Response, NextFunction } from 'express';
import { RectangleReq, RectangleDB } from '../interfaces';
import { insertClassification, getRectanglesByImageId } from '../services/classificationService'
import { getUserIdFromToken } from '@intelij-ultimate/session-utility'

export const createClassification = async function (req: Request, res: Response) {
    const session_token = req.headers['authorization']?.split(' ').pop();
    if (!session_token) return res.status(401).json({ message: 'No token provided' });

    let user_id = await getUserIdFromToken(session_token);
    if(!user_id) return res.status(401).json({ message: 'Invalid token' });

    let rectangles: RectangleReq[] = req.body.rectangles;

    try {
        let insertedRectangles: RectangleDB[] = await insertClassification(rectangles, user_id).catch();
        console.log("classificationController: classificação inserida");
        res.status(200).json({message: "Classificação inserida", classificacao: insertedRectangles});
    }
    catch (err: any) {
        res.status(500).json({message: "Erro ao inserir no BD, provocando Rollback", error: err.message || "Erro desconhecido"});
    }
    
}

export const getClassificationsById = async function (req: Request, res: Response) {
    const id = Number.parseInt(req.params.id);
    const classifications: RectangleDB[] = await getRectanglesByImageId(id);

    if(!classifications) {
        return res.status(200).json({ message: 'There are no classifications for this image' });
    }
    return res.status(200).json({ message: 'Got classifications', classifications: classifications});
    
}