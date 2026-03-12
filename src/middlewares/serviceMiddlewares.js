import { StatusCodes } from "http-status-codes";

import { handleError } from "../utils/responseUtils.js";
import Service from "../database/models/services.js";

const checkServiceExistence = async (req, res, next) => {
  try {
    const { name } = req.body;
    const existingService = await Service.findOne({
      name: name.trim().toLowerCase(),
    });
    if (existingService) {
      return handleError(res, StatusCodes.CONFLICT, "service already exist");
    }
    return next();
  } catch (error) {
    return handleError(res, StatusCodes.INTERNAL_SERVER_ERROR, error.message);
  }
};

const isServicesFound = async (req, res, next) => {
  try {
    const existingServices = await Service.find();

    if (!existingServices || existingServices.length === 0) {
      return handleError(res, StatusCodes.NOT_FOUND, "services are not found");
    }

    return next();
  } catch (error) {
    return handleError(res, StatusCodes.INTERNAL_SERVER_ERROR, error.message);
  }
};
const isServiceOwner = async (req, res, next) => {

  if (req.user.role !== "provider") {
    return handleError(
      res,
      StatusCodes.FORBIDDEN,
      "Only providers can manage services",
    );
  }
  const service= await Service.findById(req.params.id)
  if (!service) {
    return handleError(res, StatusCodes.NOT_FOUND, "service not found");
  }

  if (service.providerId.toString() !== req.user._id.toString()) {
    return handleError(
      res,
      StatusCodes.FORBIDDEN,
      "you can only edit your own service",
    );
  }
  return next();
};
export { checkServiceExistence, isServicesFound,isServiceOwner};
