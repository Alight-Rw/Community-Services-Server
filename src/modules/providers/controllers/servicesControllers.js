import { StatusCodes } from "http-status-codes";
import { handleError, handleSuccess } from "../../../utils/responseUtils.js";
import {
  createService,
  getServices,
} from "../repositories/servicesRepositories.js";
import Service from "../../../database/models/services.js";

const createServices = async (req, res) => {
  const userId = req.user?._id;
  try {
    const newService = await createService({ ...req.body, contacts: userId });

    return handleSuccess(
      res,
      StatusCodes.CREATED,
      "Service created successfully",
      newService,
    );
  } catch (error) {
    return handleError(res, StatusCodes.INTERNAL_SERVER_ERROR, error.message);
  }
};

const getLatestThreeServicesPosted = async (req, res) => {
  try {
    const latestServices = await getServices().limit(3);

    const services = latestServices.reverse();

    return handleSuccess(
      res,
      StatusCodes.OK,
      "Latest services found successfully",
      services,
    );
  } catch (error) {
    return handleError(res, StatusCodes.INTERNAL_SERVER_ERROR, error.message);
  }
};

const getAllAvailableServices = async (req, res) => {
  try {
    const availableServices = await Service.find({ isActive: true })
      .populate("category", "name")
      .sort({ createdAt: -1 });
    return handleSuccess(
      res,
      StatusCodes.OK,
      "available services fetched successfully",
      availableServices,
    );
  } catch (error) {
    return handleError(res, StatusCodes.INTERNAL_SERVER_ERROR, error.message);
  }
};

export {
  createServices,
  getLatestThreeServicesPosted,
  getAllAvailableServices,
};
