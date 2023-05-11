const ErrorHandler = require("../utils/errorhandler");
const catchAssyncError=require("../middleware/catchAssyncErrors");
const User=require("../models/userModel");
const sendToken = require("../utils/jwtToken");


//Register a user
exports.registerUsers=catchAssyncError(async(req,res,next)=>{
  const {name,email,password}=req.body;

  const user=await User.create({
     name,password,email,
     avatar:{
       public_id:"This is a URL",
       url:"ProlileURL"
     }
  });
  sendToken(user,201,res)
})

//Login USER
exports.LoginUser=catchAssyncError(async(req,res,next)=>{
    const {email,password}=req.body;

    //Checking if user has given password and email both

    if(!email || !password)
    {
        return next(new ErrorHandler("Please enter email and password",400))

    }
    const user=await User.findOne({email}).select("+Password");
    if(!user)
    {
       return next(new ErrorHandler("Invalid email and password",401))

    }
    const isPasswordMatched=user.comparePassword(password);

    if(!isPasswordMatched)
    {
       return next(new ErrorHandler("Invalid email and password",401))

    }
    
    sendToken(user,200,res)
})
//Logout USER
exports.logout=catchAssyncError(async(req,res,next)=>{
      
   res.cookie("token",null,{
     expires:new Date(Date.now()),
     httpOnly:true,
   
   })

   res.status(200).json({
      success:true,
      message:"Logged Out",
    

   })
})
//Forget Password
exports.forgotPassword=catchAssyncError(async(req,res,next)=>{
   const user=await User.findOne({email:req.body.email})
   if(!user)
   {
      return next(new ErrorHandler("User not found",404))
   }
   //Get Reset Password Token
   const resetToken=user.getResetPasswordToken()
   await user.save({validateBeforeSave:false})
   const resetPasswordUrl=`${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`
   const message=`your password reset token is :-\n\n ${resetPasswordUrl} if you not requested this email then, please 
   ignore it`

   try {
      await sendEmail({
          email:user.email,
          subject:`Ecommerce Password Recovery`,

      })
      res.status(200).json({
         success:true,
         subject:`email send to ${user.email} successfully`,
         message,
      })
   } catch (error) {
    
      user.resetPasswordToken=undefined;
      user.resetPasswordExpire=undefined;
      await user.save({validateBeforeSave:false})
      return next(new ErrorHandler(error.message,500))
   }
})




