
import Requested from "../../../database/models/Requested.js"
import Service from "../../../database/models/services.js"


const createBooking = async(data)=>{
    return  Requested.create(data)
}
const FindById = async(id)=>{
    return Service.findById(id)
}

export {
    createBooking,
    FindById
}