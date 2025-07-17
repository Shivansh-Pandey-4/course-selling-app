const zod = require("zod");

const userRegistrationSchema = zod.object({
      email : zod.string().email({message : "invalid email format"}),
      password : zod.string().min(6,{message : "minimum six characters required in password field"}),
      phoneNumber : zod.string({message : "phoneNumber should be of 10 characters"}),
      name : zod.string().max(50,{message : "maximum length 50 character allowed in name field"}).min(4,{message: "minimum 4 character name is required"}),
      isAdmin : zod.boolean().optional()
});

const userLoginSchema = zod.object({
       email : zod.string().email({message : "invalid email format"}),
      password : zod.string().min(6,{message : "minimum six characters required in password field"})
})

const userUpdateSchema = zod.object({
       userName : zod.string().min(4,{message : "minimum 4 characters required in the username"}).max(50,{message: "maximum 50 characters are allowed in the username"}),
       email : zod.string().email({message: "invalid email type"}),
       phoneNumber : zod.number({message : "ten characters are required in the phoneNumber"})
})

module.exports = {userRegistrationSchema, userLoginSchema, userUpdateSchema };