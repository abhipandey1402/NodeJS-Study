const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const Todo = new Schema(
  {
    task: {
      type: String,
      required: true,
    },
    isCompleted: {
      type: Boolean,
      required: true,
    },
    time: {
      type: Date,
      default: Date.now(),
      required: false,
    },
    username: {
      type: String,
      required: true,
    },
  },
  {
    strict: false,
  }
);

module.exports = Mongoose.model("todos", Todo);
