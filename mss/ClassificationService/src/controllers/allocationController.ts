import { requestAllClassifiedImages, requestImageForClassification } from "../services/allocationService";

import { Request, Response } from 'express';


export const allocateImage = async function (req: Request, res: Response): Promise<void> {
    let user_id = req.body.user_id;
    if(!user_id) {
        res.status(401).json({ message: 'middleware falhou' });
        return;
    }

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


export const getClassifiedImageUrlsAndIds = async function (req: Request, res: Response) {

    try {
        let imageAllocations = await requestAllClassifiedImages();

        res.status(200).json({imageAllocations});
    }
    catch (err: any) {
        res.status(500).json({message: "Erro ao obter imagens classificadas", error: err.message || "Erro desconhecido"});
    }
    
}