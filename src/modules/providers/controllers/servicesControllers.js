import { StatusCodes } from "http-status-codes";
import { handleError, handleSuccess } from "../../../utils/responseUtils.js";
import {
  createService,
  findServiceByIdAndUpdate,
  listProviderServices,
} from "../repositories/servicesRepositories.js";
import { deleteServiceWithRequests } from "../repositories/servicesRepositories.js";
import { listServices } from "../../clients/repositories/servicesRepositories.js";

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
    const lastServices = await listServices({
      ...req.query,
      sort: "-createdAt",
      limit: req.query.limit ?? 3,
    });
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
    const availableServices = await listServices({
      ...req.query,
      isActive: true,
      sort: req.query.sort || "-createdAt",
    });
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

const allProviderServices = async (req, res) => {
  const user = req.user
  try {
    const services = await listProviderServices(user, req.query);
   
    return handleSuccess(res, StatusCodes.OK, "Services fetched", services);

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

 const deleteServices = async (req, res) => {
  try {
    const serviceId = req.params.id;

    await deleteServiceWithRequests(serviceId);

    return handleSuccess(
      res,
      StatusCodes.OK,
      "Service and related requests deleted successfully",
      {}
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
  createServices,
  getLastFourServices,
  getAllAvailableServices,
  updateService,
  deleteServices,
  allProviderServices
};
