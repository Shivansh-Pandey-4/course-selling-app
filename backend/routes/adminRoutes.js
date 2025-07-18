const express = require("express");
const router = express.Router();
const CourseModel = require("../model/CourseModel");
const {UserModel} = require("../model/UserModel");
const {ContactModel} = require("../model/ContactModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); 
const adminAuthMiddelware = require("../middleware/adminAuthMiddleware");
const createCourseSchema = require("../zod-validation/createCourseSchema");
const {userUpdateSchema, userRegistrationSchema, userLoginSchema} = require("../zod-validation/userAuthSchema");


router.post("/signup",async (req,res)=>{
      const response = userRegistrationSchema.safeParse(req.body);
      if(!response.success){
          return res.status(401).send({
             msg : "invalid credential format",
             detailError :response.error.issues[0].message 
          })
      }

      const {email,password,name, phoneNumber} = req.body;
      try{
          const emailExist = await UserModel.findOne({email});
          if(emailExist){
              return res.status(403).send({
                  msg : "email should be unique. This email already exist in the database. "
              })
          }

          const hashedPassword = await bcrypt.hash(password,10);
          if(!hashedPassword){
              throw new Error("issue with password hashing in bcrypt library");
          }

          const newAdmin = await UserModel.create({name:name.trim().toUpperCase(), email: email.trim().toLowerCase(),password: hashedPassword, phoneNumber, isAdmin:true});
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
      const response = userLoginSchema.safeParse(req.body);
      if(!response.success){
         return res.status(411).send({
              msg : "invalid credential format",
              detailError : response.error.issues[0].message
         })
      }

      const {email,password} = req.body;
      try{
         const userExist = await UserModel.findOne({email: email.trim()});
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

         const token = jwt.sign({author_id: userExist._id, isAdmin: userExist.isAdmin},process.env.ADMIN_JWT_SECRET,{expiresIn: "1h"})

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
                  courseName: courseName.trim(), description: description.trim() , price, author_id : req.author_info.author_id, imageUrl
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
             const adminCourses = await CourseModel.find({author_id : req.author_info.author_id}).populate({path: "author_id"});
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
});

router.get("/users", adminAuthMiddelware, async(req,res)=>{

     try{
          const allUsers = await UserModel.find({});
          if(!allUsers || allUsers.length == 0){
              return res.status(411).send({
                 msg : "user does not exist"
              })
          }

          return res.send({
              msg : "users exist",
              allUsers
          })

     }catch(err){
         return res.status(500).send({
              msg : "server issue",
              detailError : err.message
         })
     }
})

router.delete("/delete/user/:user_id", adminAuthMiddelware, async(req,res)=>{
      const {user_id} = req.params;
      if(!user_id){
          return res.status(411).send({
             msg : "no user_id provided in the url"
          })
      }
      try{
         const deleteUser = await UserModel.findByIdAndDelete({_id : user_id});
         if(!deleteUser){
             return res.status(411).send({
                  msg : "no user found with this id: failed to delete user"
             })
         }
         return res.send({
             msg: "user deleted successfully",
             deleteUser
         })
      }catch(err){
          return res.status(500).send({
             msg : "server issue",
             detailError : err.message
          })
      }
})

router.get("/user/:user_id", adminAuthMiddelware, async(req,res)=>{
        const {user_id} = req.params;
        if(!user_id){
             return res.status(411).send({
                  msg : "user_id not provided in the url"
             })
        }

        try{
             const userExist = await UserModel.findById(user_id);
             if(!userExist){
                 return res.status(411).send({
                     msg : "invalid user_id provided"
                 })
             }
             return res.send({
                 msg : "user exist",
                 userExist
             })
        }catch(err){
             return res.status(500).send({
                 msg : "server issue",
                 detailError : `failed to fetch UserData : ${err.message}`
             })
        }
});

router.put("/update/user/:id", adminAuthMiddelware, async(req,res)=>{
     const response = userUpdateSchema.safeParse(req.body);
     if(!response.success){
          return res.status(411).send({
             msg : "invalid credentials format",
             detailError : response.error.issues[0].message
          })
     }

       const {id} = req.params;
       const userData = req.body;

       if(!id){
           return res.status(411).send({
              msg : "user_id is not provided."
           })
       }
       try{
              const updatedUserData = await UserModel.findByIdAndUpdate(id,{$set : {email: userData.email, name: userData.userName, phoneNumber: userData.phoneNumber, isAdmin: userData.isAdmin}}, {new : true, runValidators : true});   


              if(!updatedUserData){
                  return res.status(411).send({
                     msg : "invalid user_id"
                  })
              }

              return res.send({ 
                 msg : "user updated successfully",
                 updatedUserData
              })

       }catch(err){
         return res.status(500).send({
             msg : "server issue",
             detailError : err.message
         })
       }
});

router.get("/contacts", adminAuthMiddelware, async (req,res)=>{
        try{
            const allContacts = await ContactModel.find({});
            return res.send({
                 msg : "contacts exists",
                 allContacts
            })
              
        }catch(err){
             return res.status(500).send({
                 msg : "server issue",
                 detailError : err.message
             })
        }
})

router.delete("/delete/contact/:contact_id", adminAuthMiddelware, async(req,res)=>{
        const {contact_id} = req.params;
        if(!contact_id){
             return res.status(411).send({
                 msg : "course_id is not provided"
             })
        }
        try{
             const deleteContact = await ContactModel.findOneAndDelete({_id : contact_id});
             if(!deleteContact){
                 return res.status(411).send({
                     msg : "invalid course_id: failed to delete"
                 })
             }
             return res.send({
                 msg : "contact deleted successfully",
                 deleteContact
             })
        }catch(err){
             return res.status(500).send({
                 msg : "server issue",
                 detailError : err.message
             })
        }
})


module.exports = router;
