import { StatusCodes } from "http-status-codes";
import { handleError, handleSuccess } from "../../../utils/responseUtils.js";
import { createService, getServices} from "../repositories/servicesRepositories.js";

const createServices = async (req, res) => {
  const userId=req.user?._id
  try {
 
const newService=await createService( {...req.body,contacts:userId})
   
    return handleSuccess(res,StatusCodes.CREATED,"Service created successfully",newService)
  } catch (error) {
    return handleError(res,StatusCodes.INTERNAL_SERVER_ERROR,error.message)
  }
};
export { createService };
