import { StatusCodes } from "http-status-codes";
import { handleError, handleSuccess } from "../../../utils/responseUtils";
import Service from "../../../database/models/services";

const createService = async (req, res) => {
  try {
    const {
      name,
      category,
      description,
      price,
      location,
      contacts,
      timeFrom,
      timeTo,
      requestNote,
    } = req.body;
    const avatar = req.file?.path;

    if (
      !name ||
      !category ||
      !description ||
      !price ||
      !location ||
      !contacts ||
      !timeFrom ||
      !timeTo ||
      !requestNote
    ) {
      return handleError(res, StatusCodes.BAD_REQUEST,"Please fill all required fields");
    }
    if (!avatar) {
      return handleError(res, StatusCodes.BAD_REQUEST,"Service image is required");
    }
    const service = new Service({
      avatar,
      name,
      category:category || null,
      description,
      price,
      location,
      contacts,
      timeFrom,
      timeTo,
    
      requestedBy:req.user._id,
    });
    const savedService= await service.save()
    return handleSuccess(res,StatusCodes.CREATED,"Service created successfully",savedService)
  } catch (error) {
    return handleError(res,StatusCodes.INTERNAL_SERVER_ERROR,error.message)
  }
};
export { createService };
