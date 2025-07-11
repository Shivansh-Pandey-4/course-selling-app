const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  courseName: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
    minlength: 5
  },
  price: {
    type: Number,
    required: true
  },
  author_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Admin"
  }
}, { timestamps: true }); 

   const CourseModel = mongoose.model("Course", courseSchema);
   module.exports = CourseModel;
