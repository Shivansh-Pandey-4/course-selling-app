const zod = require("zod");

const adminSignupSchema = zod.object({
     name : zod.string().min(4,{message:"name should be minimum four characters long"}),
     email : zod.string().email({message: "invalid email"}),
     password : zod.string().min(6,{message: "minimum 6 characters are required"}).max(30,{message: "maximum 30 characters are allowed"})
});

const adminSigninSchema = zod.object({
      email : zod.string().email({message: "invalid email"}),
      password : zod.string().min(6,{message: "minimum 6 characters are required"}).max(30,{message:"maximum 30 characters are allowed"})
})

module.exports = {adminSigninSchema,adminSignupSchema};