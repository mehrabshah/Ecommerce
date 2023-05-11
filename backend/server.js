const app=require("./app");
const dotenv=require("dotenv")
const connectDatabase=require("./config/database")
//Handling uncaugth exception
process.on("uncaughtException",(err)=>{
  console.log(`Error ${err.message}`)
  console.log("Shutting down the error due to handling uncaught exception")
  process.exit(1)
})
//Config
dotenv.config({path:"backend/config/config.env"});
//Connecting to database
connectDatabase

 const server=app.listen(process.env.PORT,()=>{
   console.log(`server is listening to the port ${process.env.PORT}`);
})

//Unhandled Promise Rejection
process.on("unhandledRejection",err=>{
   console.log(`error:${err.message}`)
   console.log("Shutting down the server due to unhandled errors rejection")
   server.close(()=>{
      process.exit(1);
   })
})