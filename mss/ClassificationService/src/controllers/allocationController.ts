import { requestImageForClassification } from "../services/allocationService";



import { Request, Response, NextFunction } from 'express';
import { RectangleReq, RectangleDB, AllocationImageDB } from '../interfaces';
import { insertClassification, getRectanglesByImageId } from '../services/classificationService'
import { getUserIdFromToken } from '@intelij-ultimate/session-utility'


export const allocateImage = async function (req: Request, res: Response) {
    let user_id = req.body.user_id;
    if(!user_id) return res.status(401).json({ message: 'middleware falhou' });

    try {
        let allocationImageDB = await requestImageForClassification(user_id);

        if (!allocationImageDB){
            res.status(500).json({message: "sem imagens disponiveis"});
            return;
        }
        res.status(200).json({image_id:allocationImageDB.image_id,image_url:allocationImageDB.image_url});
    }
    catch (err: any) {
        res.status(500).json({message: "Erro ao inserir no BD, provocando Rollback", error: err.message || "Erro desconhecido"});
    }
    
}