import catchAsync from "../Utils/catchAsync.js";
import Category from "../Models/categoryMd.js";
import ApiFeatures from "../Utils/apiFeatures.js";
import HandleERROR from "../Utils/handleError.js";
export const createCategory = catchAsync(async (req, res, next) => {
  const category = await Category.create({...req.body, userId:req.userId});
  return res.status(201).json({
    data:category,
    message:"Category Created Successfully",
    success:true
  })
});
export const getAllCategory = catchAsync(async (req, res, next) => {
      const queryString = {...req.query,filters:{...req.query.fiters,userId:req.userId}}
      const features = new ApiFeatures(Category,queryString).filter().paginate().sort().limitFields().search().populate()
      const categories = await features.query
      return res.status(200).json({
        data:categories,
        message:"Get Categories Successfully",
        success:true
      })
});
export const getOneCategory = catchAsync(async (req, res, next) => {
  const {id}=req.params
  const category = await Category.findOne({_id:id,userId:req.userId})
  return res.status(200).json({
    data:category,
    message:"Get Category Successfully",
    success:true
  })
});
export const updateCategory = catchAsync(async (req, res, next) => {
  const {id}=req.params
const category = await Category.findByIdAndUpdate({_id: id,userId:req.userId},req.body,{new:true , runValidators:true})
if(!category){
  return next(new HandleERROR('Category Not Found',404))
}
return res.status(200).json({
  data:category,
  message:"Update Category Successfully",
  success:true
})
});
export const removeCategory = catchAsync(async (req, res, next) => {
  const {id}=req.params
const category = await Category.findByIdAndDelete({_id: id,userId:req.userId})
if(!category){
  return next(new HandleERROR('Category Not Found',404))
}
return res.status(200).json({
  data:category,
  message:"Delete Category Successfully",
  success:true
})
});
;
