import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: { type: String },
  email: { type: String, unique: true, required: true },
  password: { type: String },
  googleId: { type: String }, 
  
}, { timestamps: true });

export default mongoose.model("User", userSchema);
