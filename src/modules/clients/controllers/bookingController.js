import { StatusCodes } from "http-status-codes"
import { createBooking } from "../repositories/BookingRespositories.js"
import { handleSuccess } from "../../../utils/responseUtils.js"



const BookingService = async(req,res)=>{

    const {serviceId,Date,time,location,AdittionalNotes,fullName, email, phone,status}=req.body
    let booking = await createBooking({
        serviceId,
        Date,
        time,
        location,
        AdittionalNotes,
        fullName, 
        email, 
        phone,
        status
    })

    booking = await booking.populate({
      path: "serviceId",
      select: "name price"
    });
 

     return handleSuccess(res, StatusCodes.OK, 'Booking created successfully', booking);
}
 
 
export {
    BookingService
}