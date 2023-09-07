const mongoose = require("mongoose")
const bcrypt = require("bcryptjs");

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
            return /^[a-zA-Z]+(?: [a-zA-Z]+)?$/.test(v);
            },
        message: "الرجاء إدخال الاسم الأول بشكل صحيح",
        },
        required: [true, "First Name is required"],
    },
    lastName :{
        type: String,
        required: [true, "Last Name is required"],
        validate: {
            validator: function (v) {
            return /^[a-zA-Z]+(?: [a-zA-Z]+)?$/.test(v); // allow letters with only one space between 
            },
            message: "الرجاء إدخال الاسم الأخير بشكل صحيح",
        },
    },
    password: { type: String, required: true, length: {min: 8} },
    email: {
        type: String,
        required: true,
        unique: [true, "Email must be unique"],
        trim: true,
        lowercase: true,
        match: [
        /^\w+([\.-]?\w+)(@(gmail|hotmail|yahoo|outlook))(\.\w{2,3})+$/,
        `الرجاء إدخال إيميل صحيح يجب ان ينتهي ب 
        @gmail.com
        @yahoo.com
        @hotmail.com
        @outlook.com`
    ],
    },
    phoneNumber:{
        type: String,
        unique: [true, "Phone number must be unique"],
        match: [/^(010|011|012|015)\d{8}$/
                ,
                `الرجاء إدخال رقم الموبايل بشكل صحيح يبدأ بأحد مزودي الخدمة 
                010/011/012/015 
                ويكون في نطاق 11 رقم`],
        required: true
    },
})

Schema.statics.login = async function(phoneNumber,password){
    // console.log(this);
    const admin = await this.findOne({phoneNumber});
    // console.log("-----------------schema login-----------------------------------");
    // console.log(admin);
    // console.log("----------------------------------------------------");
    
    if (admin){
        const authenticate = await bcrypt.compare(password, admin.password);
    // console.log("-----------------authenticate-----------------------------------");
    //     console.log(authenticate);
    // console.log("----------------------------------------------------");

      if(authenticate){
        return admin;
      }
      throw Error ("Incorrect Password");
    //   throw Error("incorrect phone number");
    }
  };



  const Admin = mongoose.model("basicAdmin",Schema); //new name for model

module.exports = Admin;
