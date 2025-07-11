const zod = require("zod");

const createCourseSchema = zod.object({
  courseName: zod.string().min(6, { message: "Minimum 6 characters required" }),
  description: zod.string().min(6, { message: "Minimum 6 characters required" }),
  price: zod.number({ required_error: "Price is required" }),
  imageUrl: zod.string().url({ message: "Image must be a valid URL" })
});

module.exports = createCourseSchema;