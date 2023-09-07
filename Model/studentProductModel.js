
const mongoose = require("mongoose")

// const validEducationalLevel = ["1", "2", "3"]; // Add more if needed
// const validSemester = ["1st", "2nd"];

process.on('uncaughtException', function (error) {
  // console.log(error.stack);
});

const Schema = new mongoose.Schema({
      _id: {
        type: mongoose.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId() // Generate a new ObjectId as the default value
      },
      firstName:{
        type:String,
        validate: {
            validator: function (v) {
            return /^(?:[a-zA-Z\u0600-\u06FF]+\s{0,1})+$/.test(v);
            },
        message: "الرجاء إدخال الاسم الأول بشكل صحيح",
        },
        // required: [true, "First Name is required"],
        },
        lastName :{
        type: String,
        // required: [true, "Last Name is required"],
        validate: {
            validator: function (v) {
            return /^[\u0600-\u06FF\uFB50-\uFDFF\uFE70-\uFEFFa-zA-Z\s]+$/.test(v); // allow letters with only one space between 
            },
            message: "الرجاء إدخال الاسم الأخير بشكل صحيح",
        },
    },
    firstPhoneNumber:{
        type: String,
        // unique: [false],
        match: [/^(010|011|012|015)\d{8}$/
                ,
                `الرجاء إدخال رقم الموبايل بشكل صحيح يبدأ بأحد مزودي الخدمة 
                010/011/012/015 
                ويكون في نطاق 11 رقم`],
        required: true
    },
    secondPhoneNumber:{
        type: String,
        // unique: [false],
        match: [/^(010|011|012|015)\d{8}$/
                ,
                `الرجاء إدخال رقم الموبايل بشكل صحيح يبدأ بأحد مزودي الخدمة 
                010/011/012/015 
                ويكون في نطاق 11 رقم`],
        required: true
    },
    location: {
        governate: {// المحافظة
          type: String,
          // required: true
        },
        city: {// المركز
          type: String,
          // required: true
        },
        area : { // باقي العنوان التفصيلي
            type:String
            }
      },
      isDelivered:{
        type:Boolean,
        default: false
      },
      productId:{
        type: mongoose.Types.ObjectId,
        ref: "product"
      }
    });

    const ProductRequest = mongoose.model("productReq", Schema); //new name for model

    module.exports = ProductRequest;












