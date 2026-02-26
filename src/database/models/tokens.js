
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
}, { timestamps: true });

export default mongoose.model("Token", tokenSchema);