import { StatusCodes } from "http-status-codes"
import { createBooking } from "../repositories/BookingRespositories.js"
import { handleSuccess } from "../../../utils/responseUtils.js"



const BookingService = async(req,res)=>{

    let booking = await createBooking(
        req.body
    )

    booking = await booking.populate({
      path: "serviceId",
      select: "name price"
    });
 

     return handleSuccess(res, StatusCodes.OK, 'Booking created successfully', booking);
}
 
 
export {
    BookingService
}