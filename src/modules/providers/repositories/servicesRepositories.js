import Service from "../../../database/models/services.js"
const createService=(data)=>{
    return Service.create(data)
}


const getLatestServices = ()=>{
    return Service.find()
     
}

export {createService,getLatestServices}