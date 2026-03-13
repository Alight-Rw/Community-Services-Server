import { StatusCodes } from "http-status-codes"
import { handleError, handleSuccess } from "../../../utils/responseUtils.js"
import { createRequestedServices, FindRequestedServiceById, FindRequestedServicesInfo } from "../repositories/servicesRepositories.js";


const requestedServices = async (req, res) => {
  try {
  
    const clientId = req.user._id;
    const service = await FindRequestedServiceById(req.body.serviceId);

    let requestServices = await createRequestedServices({
      ...req.body,
      clientId, 
      providerId:service.providerId,
     

    });

   requestServices = await requestServices.populate([
     { path: 'serviceId', select: 'name price ' },
     { path: 'providerId', select: 'firstName lastName email ' },
     { path: 'clientId', select: 'firstName lastName email' }
    ]);

    return handleSuccess(res, StatusCodes.OK, "Services  Requested successfully",requestServices);

  } catch (error) {
    return handleError(res, StatusCodes.INTERNAL_SERVER_ERROR, error.message);
  }
};

const clientRequestedServices= async (req, res) => {
  try {
    

    const clientId = req.user._id;
    const { status } = req.params; 

   
    const requestedServices  = await  FindRequestedServicesInfo(clientId, status)
       
     
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
    clientRequestedServices
}