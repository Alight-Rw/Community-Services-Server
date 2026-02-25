import { required } from "joi";
import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema({
    token:{
        type:String,
        required:false
    }
})
const Tokens = mongoose.model('Tokens',tokenSchema)
export default Tokens