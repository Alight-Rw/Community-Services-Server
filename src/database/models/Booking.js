import mongoose from "mongoose";
import Service from "./services.js";

const bookingSchema = new mongoose.Schema({

    serviceId: {
        type: mongoose.Types.ObjectId,
        ref: "Service",
      
       },
        Date:{
            type:String,
            required:true
        },
        time:{
            type:String,
            required:true
        },
  
        location: {
            type: String,
            required: true
        },
        AdittionalNotes: {
            type: String,
            required: false
        },
        fullName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },

        phone: {
            type: Number,
            required: true
     
      },
       status: {
        type: String,
        enum: ["Waitting", "Approved", "Completed", "Rejected"],
        default: "Waitting"
    },

    createAt: {
        type: Date,
        default: new Date(Date.now())
    }


})

bookingSchema.pre(/^find/, function (next) {
    this.populate(
        { path: "serviceId", select: "name price" }
    )
    next()
})

const Booking = mongoose.model("Booking", bookingSchema)
export default Booking