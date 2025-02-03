import express from 'express'
import { createTask,getAllTasks,getOneTask,updateTask,removeTask } from '../Controllers/taskCn.js'
const taskRouter = express.Router()
taskRouter.route("/").post(createTask).get(getAllTasks);
taskRouter.route("/:id").get(getOneTask).patch(updateTask).delete(removeTask);
export default taskRouter