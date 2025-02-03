import mongoose from "mongoose";
const categorySchema=new mongoose.Schema({
    title:{
        type:String,
        required:[true,"title is required"]
    },
    icon:{
        type:String,
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:[true,"user is required"]
    }
},{timestamps:true})

const Category=mongoose.model("Category",categorySchema)
export default Category