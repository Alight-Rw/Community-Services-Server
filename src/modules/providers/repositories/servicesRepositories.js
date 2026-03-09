import Service from "../../../database/models/services.js"
const createService=(data)=>{
    return Service.create(data)
}


const getServices = ()=>{
    return Service.find()
     
}

export {createService,getServices}