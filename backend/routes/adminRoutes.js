const express = require("express");
const router = express.Router();
const AdminModel = require("../model/AdminModel");
const {adminSigninSchema,adminSignupSchema} = require("../zod-validation/adminAuthSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); 


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

          const newAdmin = await AdminModel.create({name,email,password});
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
         const userExist = await AdminModel.findOne({email});
         if(!userExist){
              return res.status(411).send({
                 msg : "invalid email or password"
              })
         }

         const isPasswordCorrect = await bcrypt.compare(password,userExist.password);
         if(!isPasswordCorrect){
             return res.status(411).send({
                 msg : "invalid email or password"
             })
         } 

         const token = jwt.sign({admin_id: userExist._id},process.env.ADMIN_JWT_SECRET,{expiresIn: "1h"})

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

})
