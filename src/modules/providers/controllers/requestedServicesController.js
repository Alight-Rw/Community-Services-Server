import { StatusCodes } from "http-status-codes"
import { handleError, handleSuccess } from "../../../utils/responseUtils.js"
import { FindRequestedServicesInfo } from "../repositories/servicesRepositories.js";


const providerRequestedServices = async (req, res) => {
  try {
    
    const providerId = req.user._id;
    const { status } = req.params; 

   
    const requestedServices  = await FindRequestedServicesInfo(providerId, status)
        
     
     
    if (!requestedServices.length) {
      return handleError(res, StatusCodes.NOT_FOUND, "No requested services found");
    }

    return handleSuccess(
      res,
      StatusCodes.OK,
      "Your bookings fetched successfully",
     requestedServices
    );

  } catch (error) {
    return handleError(res, StatusCodes.INTERNAL_SERVER_ERROR, error.message);
  }
};



 
export {
     providerRequestedServices
}