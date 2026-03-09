import Booking from "../../../database/models/Booking.js"
import Service from "../../../database/models/services.js"


const createBooking = async(data)=>{
    return  Booking.create(data)
}
const FindById = async(id)=>{
    return Service.findById(id)
}

export {
    createBooking,
    FindById
}