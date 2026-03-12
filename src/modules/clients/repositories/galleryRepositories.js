import Gallery from "../../../database/models/Gallery.js"


const FindGallery = () =>{
    return  Gallery.find()
}

const createGallery = (data)=>{
    return Gallery.create(data)
}

export {
     FindGallery,
     createGallery,
    
}