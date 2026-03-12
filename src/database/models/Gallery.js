import mongoose from "mongoose";


const gallerySchema = new mongoose.Schema({

    avatar:{
        type:String,
        require:true
    },
    title:{
        type:String,
        required:true
    },

    description:{
        type:String,
        required:true
    },
    createAt:{
        type:Date,
        default:new Date(Date.now())
    }
})
const Gallery = mongoose.model("Gallery",gallerySchema)
export default Gallery