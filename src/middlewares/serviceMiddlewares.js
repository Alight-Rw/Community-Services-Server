import { StatusCodes } from "http-status-codes"

import { handleError } from "../utils/responseUtils.js"
import Service from "../database/models/services.js"
import { getServices } from "../modules/providers/repositories/profileRepositories.js"

const checkServiceExistence=async(req,res,next)=>{
    
    try {
        const {name}=req.body
        const existingService=await Service.findOne({name:name.trim().toLowerCase()})
        if(existingService){
            return handleError(res,StatusCodes.CONFLICT,"service already exist")
        }
        return next()
    } catch (error) {
        return handleError(res,StatusCodes.INTERNAL_SERVER_ERROR,error.message)
        
    }

}

const checkServicesToShow =async(req,res,next)=>{
    
    try {
       
        const existingServices =await getServices()
        if(!existingServices){
            return handleError(res,StatusCodes.CONFLICT,"service are not found")
        }
        return next()
    } catch (error) {
        return handleError(res,StatusCodes.INTERNAL_SERVER_ERROR,error.message)
        
    }

}
export{checkServiceExistence,checkServicesToShow}