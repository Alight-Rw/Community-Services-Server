import { StatusCodes } from "http-status-codes";
import { handleError, handleSuccess } from "../../../utils/responseUtils.js";
import { FindGallery } from "../repositories/galleryRepositories.js"


const getGallery= async(req,res)=>{
    try {
        
        const gallery = await FindGallery();
         if(!gallery){
        return handleError(res,StatusCodes.NOT_FOUND,"Gallery are not found");

       }
      handleSuccess(res,StatusCodes.OK,"Gallery founded successfully",gallery);

    } catch (error) {
         return handleError(res, StatusCodes.INTERNAL_SERVER_ERROR, error.message);
    }
 
    
}

export {
    getGallery
}