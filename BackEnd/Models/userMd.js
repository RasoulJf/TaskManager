import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "username is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "email is required"],
    trim: true,
    unique: true,
    match: [/\S+@\S+\.\S+/, "Please enter a valid email address"],
  },
  password: {
    type: String,
    required: [true, "password is required"],
    minlength: [6, "Password must be at least 6 characters long"],
  },
  profile:{
    type:String
  }
},{timestamps:true});
const User=mongoose.model("User",userSchema)
export default User