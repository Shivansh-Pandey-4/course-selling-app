const express = require("express");
const router = express.Router();
const CourseModel = require("../model/CourseModel");
const authMiddleware = require("../middleware/authMiddleware");
const PurchasedCourseModel = require("../model/PurchasedCourseModel");

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
});

router.get("/:course_id",async(req,res)=>{
       const {course_id} = req.params;

       if(!course_id){
           return res.status(411).send({
              msg : "course cannot found without id"
           })
       }

     try{
            
            const courseExist = await CourseModel.findById(course_id).populate({path: "author_id", select:"name"});
            if(!courseExist){
                  return res.status(401).send({
                      msg : "no course Exist with this course_id"
                  })
            }

            return res.send({
                  msg : "course exist",
                  courseExist
            })

     }catch(err){
          return res.status(500).send({
              msg : "invalid course_id :",
              detailError : err.message
          })
     }
})

router.post("/purchase/:course_id", authMiddleware, async (req,res)=>{
              const {course_id} = req.params;
              if(!course_id){
                  return res.status(411).send({
                      msg : "course cannot be found without its id"
                  })
              }
              try{
                   const courseExist = await CourseModel.findById(course_id);
                   if(!courseExist){
                        return res.status(411).send({
                              msg : "course does not exist with this id"
                        })
                   }
                   
                   const purchaseCourse = await PurchasedCourseModel.create({
                        course_id , author_id : courseExist.author_id , user_id : req.user_info.user_id
                   })

                   if(!purchaseCourse){
                       throw new Error("server issue: Purchasing course failed");
                   }

                   return res.send({
                       msg : "course purchased successfully"
                   })

              }catch(err){
                  return res.status(500).send({
                      msg : "server issue",
                      detailError : err.message
                  })
              }

})

module.exports = router;
