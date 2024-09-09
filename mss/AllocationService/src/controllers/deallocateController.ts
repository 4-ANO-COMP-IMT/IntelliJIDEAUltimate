import { Request, Response } from 'express';

export const selfFullDeallocateController = (req: Request, res: Response) => {
    
    const user_id = req.body.user_id;


    if (!user_id) {
        return res.status(400).json({ message: 'No user_id provided' });
    }

    let images_allocated = getImagesAllocatedFromUserID(user_id)
    deallocateImages(images_allocated)


};

export const adminFullDeallocateController = (req: Request, res: Response) => {
        
        const user_id = req.body.user_id;
        const target_user_id = req.body.target_user_id;

        if (!user_id) {
            return res.status(400).json({ message: 'No user_id provided' });
        }
    

        if (!target_user_id) {
            return res.status(400).json({ message: 'No target_user_id provided' });
        }

        let images_allocated = getImagesAllocatedFromUserID(target_user_id)
        deallocateImages(images_allocated)
}

export const adminDeallocateController = (req: Request, res: Response) => {
    
    const user_id = req.body.user_id;
    const image_token = req.body.image_token;

    if (!user_id) {
        return res.status(400).json({ message: 'No user_id provided' });
    }

    if (!image_token) {
        return res.status(400).json({ message: 'No image_token provided' });
    }

    deallocateImageByToken(image_token)
}