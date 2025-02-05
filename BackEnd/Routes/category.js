import express from 'express'
import { createCategory,getOneCategory,getAllCategory,updateCategory,removeCategory } from '../Controllers/categoryCn.js'

const categoryRouter = express.Router()
categoryRouter.route("/").post(createCategory).get(getAllCategory);
categoryRouter.route("/:id").get(getOneCategory).patch(updateCategory).delete(removeCategory);
export default categoryRouter