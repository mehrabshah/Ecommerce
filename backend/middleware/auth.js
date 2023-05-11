const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorhandler");
const jwt=require("jsonwebtoken")
const catchAssyncErrors = require("./catchAssyncErrors");

exports.isAuthenticatedUser=catchAssyncErrors(
   async(req,res,next)=>{
     const {token}=req.cookies
     if(!token)
     {
       return next(new ErrorHandler("Please login to access this resource",401))
     }

     const decodeData=jwt.verify(token,process.env.JWT_SECRET)

    req.user=await User.findById(decodeData.id);
    console.log(req.user.role)
      next() 
   }
)
exports.authorizeRoles=(...roles)=>{
      
  return(req,res,next)=>{
      
       if(!roles.includes(req.user.role))
       {
      
      
      return next( new ErrorHandler("Role: is not allowed to access this resource",403))
       }
    next();
  }
}

// req.user.role

