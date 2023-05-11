const mongoose = require("mongoose");
const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter the product name"],
        trim: true

    },
    description: {
        type: String,
        required: [true, "Please enter the product description"]

    },
    prize: {
        type: Number,
        required: [true, "Please enter the product prize"],
        maxLength: [8, "Price cannot exceed the 8 characters"]
    },
    ratting:
    {
        type: Number,
        default: 0
    },
    images:
        [
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
            }
        ],
      category:{
        type:String,
        required:[true,"Please enter the product caregory"],
      },
      stock:{
        type:Number,
        required:[true,"Please enter the product stock"],
        maxLength:[4,"Stock cannot exceed 4 characters"],
        default:1,
      },
      numOfReviews:{
          type:Number,
          default:0,
      },
      reviews:[
          {
           name:{
              type:String,
              required:true,
           },
           rating:{
              type:String,
              required:true,


           },
           comment:
           {
             type:String,
             required:true,

           }

          }
      ],
      user:{
        type:mongoose.Schema.ObjectId,
        ref:"user",
        required:true,
      },
      createAt:{
       type:Date,
       date:Date.now,


      }
})
module.exports=mongoose.model("Product",productSchema)



