import Gallery from "../../../database/models/Gallery.js"


const FindGallery = () =>{
    return  Gallery.find()
}

const createGallery = (data)=>{
    return Gallery.create(data)
}
const FindOneGallery = ()=>{
    return Gallery.findOne()
}
export {
     FindGallery,
     createGallery,
     FindOneGallery
}