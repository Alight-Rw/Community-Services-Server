
import RequestedServices from "../../../database/models/RequestedServices.js"
import Service from "../../../database/models/services.js"


const BookService = async(data)=>{
    return RequestedServices.create(data)
}
const FindById = async(id)=>{
    return Service.findById(id)
}

export {
    BookService,
    FindById
}