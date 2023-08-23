const mongoose = require("mongoose")
const AutoIncrement = require('mongoose-sequence')(mongoose);

const validEducationalLevel = ["1", "2", "3"]; // Add more if needed
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
      type: Number,
      match: [/^[123]$/,
            `الرجاء إدخال سنة دراسية مناسبة`],
      required: [true, "Educational level is required"],
    },
    semester:{
      type: Number,
      match: [/^[12]$/,
            `الرجاء إدخال ترم دراسي مناسب`],
      required: [true, "semester is required"],
  },
  counter:{
    type: Number
  }
  
})


Schema.plugin(AutoIncrement,{
  id: 'product',
  inc_field: "counter"
});


const Product = mongoose.model("product",Schema); //new name for model
module.exports = Product;
