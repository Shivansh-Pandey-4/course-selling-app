const jwt = require("jsonwebtoken");

const authMiddleware = (req,res,next) =>{
     const {token} = req.headers;
     if(!token){
         return res.status(411).send({
              msg : "token is not present in headers"
         })
     }
     try{
         const decoded = jwt.verify(token,process.env.USER_JWT_SECRET);
         req.user_info = decoded;
         next();
     }catch(err){
          return res.status(411).send({
             msg : "invalid token provided",
             error : err.message
          })
     }
};

module.exports = authMiddleware;