import { StatusCodes } from "http-status-codes"
import { BookService } from "../repositories/requestedServicesRespositories.js"
import { handleSuccess } from "../../../utils/responseUtils.js"



const requestedServices = async(req,res)=>{

    let Booking = await BookService(
        req.body
    )

    Booking = await Booking.populate({
      path: "serviceId",
      select: "name price"
    });
 

     return handleSuccess(res, StatusCodes.OK, 'Booking created successfully', Booking);
}
 
 
export {
    requestedServices 
}