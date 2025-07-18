const mongoose = require("mongoose");

const purchasedCourseSchema = new mongoose.Schema({
      course_id : {
          type : mongoose.Schema.Types.ObjectId,
          required : true,
          ref : "Course"
      },
      user_id : {
         type : mongoose.Schema.Types.ObjectId,
         required : true,
         ref : "User"
      },
      author_id : {
         type : mongoose.Schema.Types.ObjectId,
         required : true,
         ref : "User"
      }
},{timestamps:true});

        const PurchasedCourseModel = mongoose.model("PurchasedCourse",purchasedCourseSchema);

module.exports = PurchasedCourseModel;