const express = require("express");
const router = express.Router();
const CourseModel = require("../model/CourseModel");

router.get("/",async (req,res)=>{
      try{
          const allCourse = await CourseModel.find({}).populate({path: "author_id",select : "name"});
          return res.send({
              msg : "successfully fetched all the courses",
              allCourse
          })
      }catch(err){
        return res.status(500).send({
            msg : "server issue :",
            detailError : "Cannot /Get Courses. "+err.message
        })
      }
})

module.exports = router;
