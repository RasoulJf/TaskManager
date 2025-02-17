import mongoose from "mongoose";
const taskSchema = new mongoose.Schema(
  {
    title: {
        type: String,
        required: [true, "title is required"],
      },
      description: {
        type: String,
        required: [true, "description is required"],
      },
      status: {
        type: String,
        enum: ["pending","compeleted"],
        default: "pending",
      },
    percent: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
    date:{
        type:Date,
        required:[true,"date is required"]
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    categoryId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category",
        required:[true,"category is required"]
    }
  },
  { timestamps: true }
);


const Task = mongoose.model("Task", taskSchema);

export default Task;