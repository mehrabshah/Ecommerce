
const mongoose=require("mongoose");
const validator=require("validator")
const bycrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const crypto=require("crypto")



const userSchema=new mongoose.Schema({
  
   name:{
     type:String,
     required:[true,"Please enter your name"],
     maxLength:[30,"name cannot exceed more than 30"],
     minLength:[4,"min lenght more than 4 characters"],
   },
   email:{
    type:String,
    required:[true,"Please enter your email"],
    unique:true,
    validator:[validator.isEmail,"Please enter valid email"]
   },
   password:{
    type:String,
    required:[true,"Please enter your Password"],
    minLength:[8,"password should be greater than 4 characters"],
    select:false
   },
   avatar:
    {
        public_id:
        {
            type: String,
            required: true

        },
        url:
        {
            type: String,
            required: true
        }
    },
    role:{
      type:String,
      default:"user",

    },
    resetPasswordToken:String,
    resetPasswordExpire:Date,
})
userSchema.pre("save",async function(next){
   
    if(!this.isModified("password"))
    {
        next();    
    
    }
    this.password=await bycrypt.hash(this.password,10)
})
//JWT TOKEN
userSchema.methods.getJWTToken=function()
{
  
  return jwt.sign({id:this._id},process.env.JWT_SECRET,{
     expiresIn:process.env.JWT_EXPIRE,
  })
  
}
//compare password
userSchema.methods.comparePassword=async function(enteredPassword)
{

 return await bycrypt.compare(enteredPassword,this.password)

}
//Generating password reset document
userSchema.methods.getResetPasswordToken=function(){
      
     //Generating the token
     const resetToken=crypto.randomBytes(20).toString("hex");
     //Hashing and adding reset password token to UserSchema
     this.resetPasswordToken=crypto.createHash("sha256").update(resetToken).digest("hex")
     this.resetPasswordExpire=Date.now() + 15*60*1000
     
     return resetToken;

}
module.exports=mongoose.model("User",userSchema);