import { StatusCodes } from "http-status-codes"
import { createRequestedServices, FindRequestedServicesInfo } from "../repositories/requestedServicesRespositories.js"
import { handleError, handleSuccess } from "../../../utils/responseUtils.js"



const requestedServices = async (req, res) => {
  try {
  
    const clientId = req.user._id;

    let requestServices = await createRequestedServices({
      ...req.body,
     clientId
    });

   requestServices = await requestServices.populate({
      path: "serviceId",
      select: "name price"
    });

    return handleSuccess(res, StatusCodes.OK, "Services  Requested successfully",requestServices);

  } catch (error) {
    return handleError(res, StatusCodes.INTERNAL_SERVER_ERROR, error.message);
  }
};

const MyRequestedServices = async (req, res) => {
  try {
    if (!req.user) {
      return handleError(res, StatusCodes.UNAUTHORIZED, "User not authenticated");
    }

    const clientId = req.user._id;
    const { status } = req.params; 

   
    const requestedServices  = await  FindRequestedServicesInfo()
      .where("clientId").equals(clientId)
      .where("status").equals(status) 
     
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
    requestedServices,
     MyRequestedServices
}