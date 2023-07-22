const mongoose = require("mongoose")

const validEducationalLevel = ["1st Secondary", "2nd Secondary", "3rd Secondary"]; // Add more if needed
const validSemester = ["1st", "2nd"];

const Schema = new mongoose.Schema({
    _id: {
        type: mongoose.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId() // Generate a new ObjectId as the default value
      },
    productName:{
        type:String,
        required: [true, "Product name is required"],
    },
    productPrice :{
        type: Number,
        required: [true, "Product Price is required"],
    },
    productDescription:{
      type:String,
      required: [true, "Product description is required"],    
    },
    educationalLevel:{
      type: String,
      enum: validEducationalLevel,
      required: [true, "Educational level is required"],
    },
    semester :{
      type: String,
      enum: validSemester,
      required: [true, "semester is required"],
  },
  image:{
    type: String,
    default: "default.jpg"
  }
})


mongoose.model("product",Schema); //new name for model