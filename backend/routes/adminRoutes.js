const express = require("express");
const router = express.Router();
const AdminModel = require("../model/AdminModel");
const CourseModel = require("../model/CourseModel");
const {adminSigninSchema,adminSignupSchema} = require("../zod-validation/adminAuthSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); 
const adminAuthMiddelware = require("../middleware/adminAuthMiddleware");
const createCourseSchema = require("../zod-validation/createCourseSchema");


router.post("/signup",async (req,res)=>{
      const response = adminSignupSchema.safeParse(req.body);
      if(!response.success){
          return res.status(401).send({
             msg : "invalid credential format",
             detailError :response.error.issues[0].message 
          })
      }

      const {email,password,name} = req.body;
      try{
          const emailExist = await AdminModel.findOne({email});
          if(emailExist){
              return res.status(403).send({
                  msg : "email should be unique. This email already exist in the database. "
              })
          }

          const hashedPassword = await bcrypt.hash(password,10);
          if(!hashedPassword){
              throw new Error("issue with password hashing in bcrypt library");
          }

          const newAdmin = await AdminModel.create({name:name.trim().toUpperCase(), email: email.trim().toLowerCase(),password: hashedPassword});
          return res.send({
             msg : "Admin Signed Up successfully"
          })

      }catch(err){
          return res.status(500).send({
             msg : "signup process failed",
             detailError : err.message
          })
      }
})

router.post("/signin",async (req,res)=>{
      const response = adminSigninSchema.safeParse(req.body);
      if(!response.success){
         return res.status(411).send({
              msg : "invalid credential format",
              detailError : response.error.issues[0].message
         })
      }

      const {email,password} = req.body;
      try{
         const userExist = await AdminModel.findOne({email: email.trim()});
         if(!userExist){
              return res.status(411).send({
                 msg : "invalid email or password"
              })
         }

         const isPasswordCorrect = await bcrypt.compare(password.trim(),userExist.password);
         if(!isPasswordCorrect){
             return res.status(411).send({
                 msg : "invalid email or password"
             })
         } 

         const token = jwt.sign({author_id: userExist._id},process.env.ADMIN_JWT_SECRET,{expiresIn: "1h"})

         return res.send({
             msg : "admin logged in successfully",
             token
         })

      }catch(err){
         return res.status(500).send({
             msg : "failed to login. ",
             detailError : err.message
         })
      }

});

router.post("/create/course",adminAuthMiddelware, async (req,res)=>{
           const response = createCourseSchema.safeParse(req.body);
           if(!response.success){
                return res.status(411).send({
                     msg : "invalid credential format",
                     detailError : response.error.issues[0].message
                })
           }

           const {courseName, description, price, imageUrl} = req.body;

           try{
               const newCourse = await CourseModel.create({
                  courseName: courseName.trim(), description: description.trim() , price, author_id : req.author_id, imageUrl
               })

               return res.send({
                 msg : "new course created successfully"
               })
           }catch(err){
              return res.status(500).send({
                  msg : "course creation failed.",
                  detailError : err.message
              })
           }


});

router.delete("/delete/courses/:course_id", adminAuthMiddelware, async(req,res)=>{
            
               const {course_id} = req.params;

                if(!course_id){
                    return res.status(411).send({
                        msg : "course_id is not provided or empty"
                    })
                }

        try{
             
            
            const deleteCourse = await CourseModel.findByIdAndDelete({_id: course_id});
             if (!deleteCourse) {
                return res.status(404).send({ msg: "Invalid course ID or course not found" });
                }
             
            return res.send({
                 msg : "course deleted successfully"
            })

        }catch(err){
             return res.status(500).send({
                 msg : "failed to delete the course",
                 detailError : err.message
             })
        }
});

router.get("/courses", adminAuthMiddelware, async (req,res)=>{

         try{
             const adminCourses = await CourseModel.find({author_id : req.author_id}).populate({path: "author_id"});
             if(!adminCourses){
                  return res.status(411).send({
                      msg : "No course Exist for this author_id"
                  })
             }
             return res.send({
                  msg : "course exist",
                  allCourses : adminCourses
             })
         }catch(err){
             return res.status(500).send({
                  msg : "server issue",
                  detailError : err.message
             })
         }
})


module.exports = router;
