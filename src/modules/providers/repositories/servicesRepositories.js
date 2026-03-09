import Service from "../../../database/models/services.js"
const createService=(data)=>{
    return Service.create(data)
}
export {createService}