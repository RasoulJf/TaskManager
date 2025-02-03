import express from "express";
import { fileURLToPath } from "url";
import catchError from "./Utils/catchError.js";
import HandleERROR from "./Utils/handleError.js";
import jwt from "jsonwebtoken";
import path from "path";
import cors from "cors";
import authRouter from "./Routes/auth.js";
import categoryRouter from "./Routes/category.js";
import taskRouter from "./Routes/task.js";
import userRouter from "./Routes/user.js";
import uploadRouter from "./Routes/upload.js";

const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("Public"));
app.use("/api/auth", authRouter);
// app.use((req, res, next) => {
//   try {
//     const { id } = jwt.verify(
//       req?.headers?.authorization.split(" ")[1],
//       process.env.JWT_SECRET
//     );
//     if (id) {
//       req.userId = id;
//       return next();
//     } else {
//       return res.status(401).json({
//         message: "you must be have login first",
//         success: false,
//       });
//     }
//   } catch (error) {
//     return res.status(401).json({
//       message: "you must be have login first",
//       success: false,
//     });
//   }
// });
app.use("/api/categories", categoryRouter);
app.use("/api/tasks", taskRouter);
app.use("/api/users", userRouter);
app.use("/api/upload", uploadRouter);

app.use("*", (req, res, next) => {
  next(new HandleERROR("Route not Found", 404));
});
app.use(catchError);

export default app;
