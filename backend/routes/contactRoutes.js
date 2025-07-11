const express = require("express");
const router = express.Router();
const {ContactModel} = require("../model/ContactModel");
const contactSchema = require("../zod-validation/contactSchema");

router.post("/",async (req,res)=>{
      const response = contactSchema.safeParse(req.body);
      if(!response.success){
          return res.status(411).send({
             msg : "invalid credential format",
             detailError : response.error.issues[0].message
          })
      }

      const {username,email,message} = req.body;

      try{
          const newContact = await ContactModel.create({
             username: username.trim(), email: email.trim(), message: message.trim()
          })

          return res.send({
             msg : "message send successfully. Thankyou for contacting us"
          })
      }catch(err){
          return res.status(500).send({
             msg : "server issue: failed to send message",
             detailError : err.message
          })
      }
})

module.exports = router;