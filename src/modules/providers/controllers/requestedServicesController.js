import { StatusCodes } from "http-status-codes"
import { handleError, handleSuccess } from "../../../utils/responseUtils.js"
import { FindProviderRequestedServicesInfo } from "../repositories/servicesRepositories.js";


const providerRequestedServices = async (req, res) => {
  try {
    const providerId = req.user._id;
    const { status } = req.params;

    const requestedServices = await FindProviderRequestedServicesInfo(
      providerId,
      status
    );

    if (!requestedServices.length) {
      return handleError(
        res,
        StatusCodes.NOT_FOUND,
        "No requested services found"
      );
    }

    return handleSuccess(
      res,
      StatusCodes.OK,
      "Your service requests fetched successfully",
      requestedServices
    );
  } catch (error) {
    return handleError(
      res,
      StatusCodes.INTERNAL_SERVER_ERROR,
      error.message
    );
  }
};



 
export {
     providerRequestedServices
}