import { StatusCodes } from "http-status-codes";
import { handleError, handleSuccess } from "../../../utils/responseUtils.js";

import { createService } from "../repositories/servicesRepositories.js";


const createServices = async (req, res) => {
  const userId=req.user?._id
  try {
    const {
      avatar,
      name,
      category,
      description,
      price,
      location,
      timeFrom,
      timeTo,
     
    } = req.body;
   
const newService=await createService( {
      avatar,
      name,
      category,
      description,
      price,
      location,
      contacts:userId,
      timeFrom,
      timeTo,
     
    })
   
    return handleSuccess(res,StatusCodes.CREATED,"Service created successfully",newService)
  } catch (error) {
    return handleError(res,StatusCodes.INTERNAL_SERVER_ERROR,error.message)
  }
};
export { createServices };
