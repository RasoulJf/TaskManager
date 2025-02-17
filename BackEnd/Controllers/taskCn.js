import catchAsync from "../Utils/catchAsync.js"
import Task from "../Models/taskMd.js"
import ApiFeatures from "../Utils/apiFeatures.js";
import HandleERROR from "../Utils/handleError.js";
export const createTask=catchAsync(async(req,res,next)=>{
    const task = await Task.create({...req.body, userId:req.userId});
    return res.status(201).json({
      data:task,
      message:"Task Created Successfully",
      success:true
    })
})
export const getAllTasks=catchAsync(async(req,res,next)=>{
    const queryString = {...req.query,filters:{...req.query.fiters,userId:req.userId}}
    console.log(queryString)
    const features = new ApiFeatures(Task,queryString).filter().paginate().sort().limitFields().search().populate()
    const tasks = await features.query
    return res.status(200).json({
      data:tasks,
      message:"Get Tasks Successfully",
      success:true
    })
})
export const getOneTask=catchAsync(async(req,res,next)=>{
     const {id} = req.params
     const task = await Task.findById({_id:id , userId:req.userId})
     return res.status(200).json({
        data:task,
        message:"Get Task Successfully",
        success:true
      })
})
export const updateTask=catchAsync(async(req,res,next)=>{
    const {id} = req.params
  const task = await Task.findOneAndUpdate({_id: id,userId:req.userId},req.body,{new:true , runValidators:true})
  if(!task){
    return next(new HandleERROR('Task Not Found',404))
  }
  return res.status(200).json({
    data:task,
    message:"Update Task Successfully",
    success:true
  })
})
export const removeTask=catchAsync(async(req,res,next)=>{
    const {id}=req.params
    const task = await Task.findByIdAndDelete({_id: id,userId:req.userId})
    if(!category){
      return next(new HandleERROR('Task Not Found',404))
    }
    return res.status(200).json({
      data:task,
      message:"Delete Task Successfully",
      success:true
    })
})