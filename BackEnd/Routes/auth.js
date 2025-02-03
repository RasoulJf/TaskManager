import express from 'express'
import { login,register } from '../Controllers/authCn.js'
const authRouter = express.Router()
authRouter.route("/").post(login);
authRouter.route("/register").post(register);
export default authRouter