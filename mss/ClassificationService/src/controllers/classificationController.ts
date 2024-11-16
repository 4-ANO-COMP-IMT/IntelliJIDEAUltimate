import { Request, Response, NextFunction } from 'express';
import { RectangleReq, RectangleDB } from '../interfaces';
import { insertClassification, getRectanglesByImageId } from '../services/classificationService'
import { getUserIdFromToken } from '@intelij-ultimate/session-utility'

export const createClassification = async function (req: Request, res: Response) {
    let user_id = req.body.user_id;
    if(!user_id) {
        res.status(401).json({ message: 'middleware falhou' });
        return;
    }

    let rectangles: RectangleReq[] = req.body.rectangles;
    let image_id: number = req.body.image_id;

    try {
        let insertedRectangles: RectangleDB[] = await insertClassification(rectangles, image_id).catch();
        console.log("classificationController: classificação inserida");
        res.status(200).json({message: "Classificação inserida", classificacao: insertedRectangles});
    }
    catch (err: any) {
        res.status(500).json({message: "Erro ao inserir no BD, provocando Rollback", error: err.message || "Erro desconhecido"});
    }
    
}

export const getClassificationsById = async function (req: Request, res: Response): Promise<void> {
    const id = Number.parseInt(req.params.id);
    const classifications: RectangleDB[] = await getRectanglesByImageId(id);

    if(!classifications) {
        res.status(200).json({ message: 'There are no classifications for this image' });
        return;
    }
    res.status(200).json({ message: 'Got classifications', classifications: classifications});
    
}