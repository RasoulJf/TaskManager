import catchAsync from "../Utils/catchAsync.js";
import jwt from 'jsonwebtoken'
import Category from "../Models/categoryMd.js";
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
export const getAllCategory = catchAsync(async (req, res, next) => {});
export const getOneCategory = catchAsync(async (req, res, next) => {});
export const updateCategory = catchAsync(async (req, res, next) => {});
export const removeCategory = catchAsync(async (req, res, next) => {});
