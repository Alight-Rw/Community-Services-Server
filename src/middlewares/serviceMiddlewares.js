import { StatusCodes } from "http-status-codes"

import { handleError } from "../utils/responseUtils.js"
import Service from "../database/models/services.js"
import { getServices } from "../modules/providers/repositories/servicesRepositories.js"


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
export{isServiceExist,fetchService}