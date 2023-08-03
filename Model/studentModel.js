const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

process.on('uncaughtException', function (error) {
  console.log(error.stack);
});

const validGovernates = ['Cairo', 'Alexandria', 'Giza', 'Kafr El Sheikh', 'Al Dakahlia']; // Add more if needed
const validCities = ['Qallin', "El Hamool", "El Reyad", "Desouk", "Metoubes", "Fuwa", "Sidi Salem"]; // Add more if needed


const studentSchema = new mongoose.Schema({
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
    age : {
        type: Number,
        match: [/^(1[0-9]|10)$/
        ,
       ` الرجاء إدخال عمر بين 10 إلى 19 سنة`],
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
    parentPhoneNumber:{
      type: String,
      unique: [true, "Phone number must be unique"],
      match: [/^(010|011|012|015)\d{8}$/
              ,
              `الرجاء إدخال رقم الموبايل بشكل صحيح يبدأ بأحد مزودي الخدمة 
              010/011/012/015 
              ويكون في نطاق 11 رقم`],
      required: true
  },
    educationalLevel:{
        type: Number,
        match: [/^[123]$/,
              `الرجاء إدخال سنة دراسية مناسبة`],
    },
    semester:{
      type: Number,
        match: [/^[12]$/,
              `الرجاء إدخال ترم دراسي مناسب`],
    },
    location: {
        governate: {// المحافظة
          type: String,
          enum: validGovernates,
          // required: true
        },
        city: {// المركز
          type: String,
          enum: validCities,
          // required: true
        },
        area : { // باقي العنوان التفصيلي
            type:String,
            validate : {
              validator : function(value) {
                return /^[a-zA-Z0-9\s]+$/.test(value);
              },
              message : "Area should only contain letters, numbers, and spaces"
            }
         }
      },
      isActive:{
        type: Boolean,
        default: true
      },
      isSubscriped:{
        type: Boolean,
        default: false
      },
})

studentSchema.statics.login = async function(phoneNumber,password){
  const student = await this.findOne({phoneNumber});
  if (student){
      const authenticate = await bcrypt.compare(password, student.password);
    if(authenticate){
      return student;
    }
    throw Error ("Incorrect Password");
  }
  throw Error("incorrect phone number");
};

const Student =mongoose.model("student",studentSchema); //new name for model

module.exports = Student;