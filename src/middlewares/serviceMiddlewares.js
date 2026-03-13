import { StatusCodes } from "http-status-codes"

import { handleError } from "../utils/responseUtils.js"
import Service from "../database/models/services.js"
import { findServiceById, getServices } from "../modules/providers/repositories/servicesRepositories.js"


const isServiceExist=async(req,res,next)=>{
    
    try {
        const {name}=req.body
        const service=await Service.findOne({name:name.trim().toLowerCase()})
        if(service){
            return handleError(res,StatusCodes.CONFLICT,"service already exist")
        }
        return next()
    } catch (error) {
        return handleError(res,StatusCodes.INTERNAL_SERVER_ERROR,error.message)
        
    }

}

const fetchService = async (req, res, next) => {
  try {
    const services = await getServices();

    if (!services || services.length === 0) {
      return handleError(res, StatusCodes.NOT_FOUND, "services are not found");
    }

    return next();
  } catch (error) {
    return handleError(res, StatusCodes.INTERNAL_SERVER_ERROR, error.message);
  }
};
const isServiceOwner = async (req, res, next) => {
      try {
         if (req.user.role !== "provider") {
    return handleError(
      res,
      StatusCodes.FORBIDDEN,
      "Only providers can manage services",
    );
  }
  const service= await findServiceById(req.params.id)
  if (!service) {
    return handleError(res, StatusCodes.NOT_FOUND, "service not found");
  }
const providerId = service.providerId?._id?.toString() ?? service.providerId?.toString();
    const userId = req.user._id?.toString();

    if (providerId !== userId) {
      return handleError(res, StatusCodes.FORBIDDEN, "you can only edit your own service");
    }
 
  return next();
      } catch (error) {
          return handleError(res, StatusCodes.INTERNAL_SERVER_ERROR, error.message);
      }
 
};
export{isServiceExist,fetchService,isServiceOwner}