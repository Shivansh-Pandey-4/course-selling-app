const jwt = require("jsonwebtoken");

const adminAuthMiddelware = (req,res,next)=>{
      const {token} = req.headers;
      if(!token){
         return res.status(411).send({
             msg : "token is not provided in the headers"
         })
      }
      try{
         const decoded = jwt.verify(token,process.env.ADMIN_JWT_SECRET);
         req.author_id = decoded.author_id;
         next();
      }catch(err){
         return res.status(500).send({
             msg : "invalid token provided",
             detailError : err.message
         })
      }
}

module.exports = adminAuthMiddelware;