const ErrorHandler=require("../utils/errorhandler")
module.exports=(err,req,res,next)=>{
   err.statusCode=err.statusCode || 500;
   err.message=err.message || "Internal Server Error";
   //Wrong MongoDb Id error
   if(err.name=="CastError")
   {
     const message=`Reaource not found.invalid ${err.path}`;
     err=new ErrorHandler(message,404);
   }

   
   res.status(err.statusCode).json({
    success:false,
    error:err.message


   });
   
}