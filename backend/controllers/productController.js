const { response } = require("../app");
const Product=require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAssyncError=require("../middleware/catchAssyncErrors");
const ApiFeatures = require("../utils/apifeatures");

//Create Product-Admin
exports.createProduct=catchAssyncError(async (req,res,next)=>{
   req.body.user=req.user.id


    const product=await Product.create(req.body);
    res.status(201).json({
        success:true,
        product

    })
})
//Get all Product
exports.getAllProducts=catchAssyncError(async (req,res)=>{
  
  const resultPerPage=2;
  const productcount=await Product.countDocuments()
  const apifeature=new ApiFeatures(Product.find(),req.query).search().filter().pagination(resultPerPage)
  const products=await apifeature.query;
  
   res.status(200).json({
      success:true,
      products
   })
})
//Update the Product--Admin
exports.updateProduct=catchAssyncError (async(req,res,next)=>{

  let product=await Product.findById(req.params.id);
  if(!product)
  {
          return next(new ErrorHandler("Product not found",404)) 
          
  }
  product=await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false,
  });
  res.status(200).json({
     success:true,
     product
  })
})
//Delete the product-Admin
exports.deleteProduct=catchAssyncError (async(req,res,next)=>{
  const product=await Product.findById(req.params.id,)
  if(!product)
  {
          return next(new ErrorHandler("Product not found",404)) 
          
  }

await product.remove();
res.status(200).json({
  success:true,
  message:"Product Delete Successfully"

})
})
//Get Product Details
exports.getProductDetails=catchAssyncError (async(req,res,next)=>{
  const product=await Product.findById(req.params.id,)

  if(!product)
  {
          return next(new ErrorHandler("Product not found",404)) 
          
  }
  res.status(200).json({
    success:true,
    product,
    productcount

  })

})


