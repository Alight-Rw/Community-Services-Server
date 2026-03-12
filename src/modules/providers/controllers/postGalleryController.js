

import { StatusCodes } from "http-status-codes";
import { handleError, handleSuccess } from "../../../utils/responseUtils.js";
import { createGallery, FindOneGallery } from "../../clients/repositories/galleryRepositories.js";


const postGallery= async(req,res)=>{
    try {
       
       
        const gallery = await createGallery(req.body);

       handleSuccess(res,StatusCodes.OK,"Gallery created successfully",gallery);
        
    } catch (error) {
        return handleError(res, StatusCodes.INTERNAL_SERVER_ERROR, error.message);
    }
   

}

export {
    postGallery
}

 