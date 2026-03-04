
import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
    deviceId: {  
    type: String,
    required:false,
  },
}, { timestamps: true });
tokenSchema.index({ userId: 1, deviceId: 1 }, { unique: true });
const Token = mongoose.model("Token", tokenSchema);
export default Token