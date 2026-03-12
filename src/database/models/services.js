
import mongoose from "mongoose";

const serviceSchema=new mongoose.Schema({
        avatar:{
        type:String,
        required:true
    },
        name:{
        type:String,
        required:true

    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category"
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
        location:{
        type:String,
        required:true

    },
        providerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
     timeFrom:{
        type:String,
        required:true

    },
      timeTo:{
        type:String,
        required:true

    },
     status:{
        type:String,
       enum:['waiting', 'approved', 'rejected', 'completed'],
       default:null

    },
      requestNote:{
        type:String,
        default:null
      },
      rejectionNote:{
        type:String,
        default:null
      },
        isActive: {
    type: Boolean,
    default: true
        },
      
      createdAt:{
        type:Date,
        default:new Date(Date.now())
      }
})

const Service=mongoose.model("Service",serviceSchema)
export default Service