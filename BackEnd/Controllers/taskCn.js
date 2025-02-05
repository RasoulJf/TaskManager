import catchAsync from "../Utils/catchAsync.js"
import Task from "../Models/taskMd.js"
export const createTask=catchAsync(async(req,res,next)=>{
    const task = await Task.create({...req.body, userId:req.userId});
    return res.status(201).json({
      data:task,
      message:"Task Created Successfully",
      success:true
    })
})
export const getAllTasks=catchAsync(async(req,res,next)=>{})
export const getOneTask=catchAsync(async(req,res,next)=>{})
export const updateTask=catchAsync(async(req,res,next)=>{})
export const removeTask=catchAsync(async(req,res,next)=>{})