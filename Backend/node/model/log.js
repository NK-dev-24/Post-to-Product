import mongoose from "mongoose";

const logSchema = new mongoose.Schema({
  message: { type: String, required: true },
  level: { type: String, required: true },
  user: { type: String, required: true }, // The user who created the log
}, { timestamps: true });

const Log = mongoose.model('Log', logSchema);

export default Log;
