import { StatusCodes } from "http-status-codes";
import { handleError, handleSuccess } from "../../../utils/responseUtils.js";
import {
  createService,
  findServiceByIdAndUpdate,
  getServices,
} from "../repositories/servicesRepositories.js";
import Service from "../../../database/models/services.js";

const createServices = async (req, res) => {
  const providerId = req.user?._id;
  try {
    const newService = await createService({ ...req.body,providerId });

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

const getLastFourServices = async (req, res) => {
  try {
    const lastServices = await getServices().sort({ createdAt: -1 }).limit(3);
    return handleSuccess(
      res,
      StatusCodes.OK,
      "Latest services found successfully",
      lastServices
    );
  } catch (error) {
    return handleError(res, StatusCodes.INTERNAL_SERVER_ERROR, error.message);
  }
}

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
const updateService = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedService = await findServiceByIdAndUpdate(id, { ...req.body });

    return handleSuccess(res, StatusCodes.OK, "Service updated", updatedService);
  } catch (error) {
    return handleError(res, StatusCodes.INTERNAL_SERVER_ERROR, error.message);
  }
};

export {
  createServices,
  getLastFourServices,
  getAllAvailableServices,
  updateService
};
