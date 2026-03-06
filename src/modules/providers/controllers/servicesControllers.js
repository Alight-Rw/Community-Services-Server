import { StatusCodes } from "http-status-codes";
import { handleError, handleSuccess } from "../../../utils/responseUtils";
import Service from "../../../database/models/services";


const createService = async (req, res) => {
  try {
    const {
      avatar,
      name,
      category,
      description,
      price,
      location,
      contacts,
      timeFrom,
      timeTo,
    } = req.body;
   

   
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
      requestNote:req.body.requestNote || null,
      requestedBy:req.user._id,
    });
    const savedService= await service.save()
    return handleSuccess(res,StatusCodes.CREATED,"Service created successfully",savedService)
  } catch (error) {
    return handleError(res,StatusCodes.INTERNAL_SERVER_ERROR,error.message)
  }
};
export { createService };
