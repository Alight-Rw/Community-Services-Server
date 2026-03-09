import { StatusCodes } from "http-status-codes"

import { handleError } from "../utils/responseUtils.js"
import Service from "../database/models/services.js"
<<<<<<< HEAD
import {  getLatestServices } from "../modules/providers/repositories/servicesRepositories.js"
=======
>>>>>>> 2120c47 (check if the service is already exist)

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
<<<<<<< HEAD

const checkServicesToShow =async(req,res,next)=>{
    
    try {
       
        const existingServices =await getLatestServices()
        if(!existingServices){
            return handleError(res,StatusCodes.CONFLICT,"service are not found")
        }
        return next()
    } catch (error) {
        return handleError(res,StatusCodes.INTERNAL_SERVER_ERROR,error.message)
        
    }

}
export{checkServiceExistence,checkServicesToShow}
=======
export{checkServiceExistence}
>>>>>>> 2120c47 (check if the service is already exist)
