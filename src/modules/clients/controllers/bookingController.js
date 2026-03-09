import { StatusCodes } from "http-status-codes"
import { createBooking } from "../repositories/BookingRespositories.js"
import { handleSuccess } from "../../../utils/responseUtils.js"



const BookingService = async(req,res)=>{

    const {year,month,day,time,location,AdittionalNotes,fullName, email, phone,status}=req.body
    let booking = await createBooking({
        year,
        month,
        day,
        time,
        location,
        AdittionalNotes,
        fullName, 
        email, 
        phone,
        status
    })

    booking = await booking.populate([
    {path:"serviceId",select:"name,price"}
  ])
 

     return handleSuccess(res, StatusCodes.OK, 'Booking created successfully', booking);
}
 
 
export {
    BookingService
}