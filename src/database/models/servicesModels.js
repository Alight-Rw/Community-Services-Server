
import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
  serviceName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  }
});

export const Service =
  mongoose.models.Service || mongoose.model("Service", serviceSchema);