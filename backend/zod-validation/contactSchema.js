const zod = require("zod");

const contactSchema = zod.object({
      username : zod.string().min(4,{message: "minimum 4 characters are required in username field"}).max(50,{message:"maximum 50 characters allowed in username field"}),

      email : zod.string().email({message: "invalid email"}),

      message : zod.string().min(2,{message: "minimum 2 characters are required in message field"})
})

module.exports = contactSchema;