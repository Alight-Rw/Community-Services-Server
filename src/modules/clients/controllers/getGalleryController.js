import { StatusCodes } from "http-status-codes";
import { handleError, handleSuccess } from "../../../utils/responseUtils.js";
import { listGallery } from "../repositories/galleryRepositories.js"


const getGallery= async(req,res)=>{
    try {
        
        const gallery = await listGallery(req.query);
      handleSuccess(res,StatusCodes.OK,"Gallery founded successfully",gallery);

    } catch (error) {
         return handleError(res, StatusCodes.INTERNAL_SERVER_ERROR, error.message);
    }
 
    
}

export {
    getGallery
}
