import catchAsync from "../Utils/catchAsync.js";
import jwt from 'jsonwebtoken'
import Category from "../Models/categoryMd.js";
import ApiFeatures from "../Utils/apiFeatures.js";
import HandleERROR from "../Utils/handleError.js";
export const createCategory = catchAsync(async (req, res, next) => {
  const { id } = jwt.verify(
    req?.headers?.authorization.split(" ")[1],
    process.env.JWT_SECRET
  );
  const {userId,...others}=req.body
  const category = await Category.create({userId:id,...others});
  return res.status(200).json({
    category,
    message:"Category Created Successfully",
    success:true
  })
});
export const getAllCategory = catchAsync(async (req, res, next) => {
    const { id:userId } = jwt.verify(
        req?.headers?.authorization.split(" ")[1],
        process.env.JWT_SECRET
      );
      const filters = req.query.filters ? {...req.query.filters,userId} : {userId}
      const queryString = {...req.query,filters}
      const features = new ApiFeatures(Category,queryString).filter().paginate().sort().limitFields().search()
      const categories = await features.query.populate({
        path:"userId",
        select:"username email"
      })
      const countCategories = await Category.countDocuments(filters)
      return res.status(200).json({
        categories,
        countCategories,
        message:"Get Categories Successfully",
        success:true
      })
});
export const getOneCategory = catchAsync(async (req, res, next) => {
  const { id:userId } = jwt.verify(
    req?.headers?.authorization.split(" ")[1],
    process.env.JWT_SECRET
  );
  const {id:categoryId}=req.params
  const category = await Category.findOne({_id:categoryId,userId}).populate(
    {
      path:"userId",
        select:"username email"
    }
  )
  if(!category){
    return next(new HandleERROR('you dont have permission',400))
  }
  return res.status(200).json({
    category,
    message:"Get Category Successfully",
    success:true
  })
});
export const updateCategory = catchAsync(async (req, res, next) => {
  const { id:userId } = jwt.verify(
    req?.headers?.authorization.split(" ")[1],
    process.env.JWT_SECRET
  );
  const {id:categoryId}=req.params
const newCategory = await Category.findByIdAndDelete({
  _id: categoryId,
  userId
}
)
if(!newCategory){
  return next(new HandleERROR('you dont have permission',400))
}
return res.status(200).json({
  newCategory,
  message:"Update Category Successfully",
  success:true
})
});
export const removeCategory = catchAsync(async (req, res, next) => {
  const { id:userId } = jwt.verify(
    req?.headers?.authorization.split(" ")[1],
    process.env.JWT_SECRET
  );
  const {id:categoryId}=req.params
const category = await Category.findByIdAndDelete({
  _id: categoryId,
  userId
}
)
if(!category){
  return next(new HandleERROR('you dont have permission',400))
}
return res.status(200).json({
  message:"Delete Category Successfully",
  success:true
})
});
;
