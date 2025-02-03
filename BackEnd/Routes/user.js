import express from 'express'
import { getOneUser,updateUser } from '../Controllers/userCn.js'
const userRouter = express.Router()
userRouter.route("/").get(getOneUser).patch(updateUser);
export default userRouter