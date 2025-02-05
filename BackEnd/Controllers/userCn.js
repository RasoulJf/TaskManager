import catchAsync from "../Utils/catchAsync.js"
import User from "../Models/userMd.js"
export const updateUser=catchAsync(async(req,res,next)=>{
    const user = await User.findById(req.userId)
    return res.status(200).jaon({
        success:true,
        message:"I Get You :)",
        data:user
    })
})
export const getOneUser=catchAsync(async(req,res,next)=>{
    const user=await User.findByIdAndUpdate(req.userId,req.body,{new:true,runValidators:ture})
    return res.status(200).json({
        success:true,
        message:"I Change You :)", 
        data:user
    })
})
