const express = require("express");
const router = express.Router();
const {UserModel} = require("../model/UserModel");
const {userRegistrationSchema,userLoginSchema} = require("../zod-validation/userAuthSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


router.post("/register",async (req,res)=>{
    const response = userRegistrationSchema.safeParse(req.body);
      if(!response.success){
           return res.status(411).send({
             msg : "invalid credential format",
             detailError :response.error.issues[0].message
           })
      }

      const {email,password,phoneNumber,isAdmin,name} = req.body;
      try{
           const emailExist = await UserModel.findOne({email});
           if(emailExist){
               return res.status(411).send({
                  msg : "email already exist, email should be unique"
               })
           }
            
           const hashedPassword = await bcrypt.hash(password.trim(),10);
           if(!hashedPassword){
                throw new Error("issue with bcrypt library");
           }
           const newUser = await UserModel.create({
               email:email.trim(), password:hashedPassword, phoneNumber:phoneNumber.trim(), isAdmin:false, name:name.trim()
           })

           if(!newUser){
              throw new Error("User Registration Failed");
           }
            return res.send({
                 msg : "User Signed Up successfully"
            })
      }catch(err){
          return res.status(500).send({
              msg : "issue with server",
              detailError : err.message
          })
      }

});

router.post("/login",async(req,res)=>{
      const response = userLoginSchema.safeParse(req.body);
      if(!response.success){
          return res.status(411).send({
              msg : "invalid credential format",
              detailError :response.error.issues[0].message
          })
      }

      const {email ,password} = req.body;
      try{
          const userExist = await UserModel.findOne({email : email.trim()});
          if(!userExist){
             return res.status(411).send({
                  msg : "invalid email or password"
             })
          }

          const passwordCorrect = await bcrypt.compare(password.trim(),userExist.password);
          if(!passwordCorrect){
              return res.status(411).send({
                  msg : "invalid username or password"
              })
          }

          const token = jwt.sign({user_id: userExist._id, name:userExist.name },process.env.USER_JWT_SECRET,{expiresIn:"1h"});

          return res.send({
             msg : "User Logged in successfully",
             token
          })

      }catch(err){
          return res.status(500).send({
              msg : "issue in the server",
              detailError : err.message
          })
      }
});



module.exports = router;