import { StatusCodes } from "http-status-codes"
import { createBooking } from "../repositories/requestedRespositories.js"
import { handleSuccess } from "../../../utils/responseUtils.js"



const requestService = async(req,res)=>{

    let Booking = await createBooking(
        req.body
    )

    Booking = await Booking.populate({
      path: "serviceId",
      select: "name price"
    });
 

     return handleSuccess(res, StatusCodes.OK, 'Booking created successfully', Booking);
}
 
 
export {
    requestService 
}