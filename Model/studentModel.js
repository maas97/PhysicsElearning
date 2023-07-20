const mongoose = require("mongoose")


const validGovernates = ['Cairo', 'Alexandria', 'Giza', 'Kafr El Sheikh', 'Al Dakahlia']; // Add more if needed
const validCities = ['Qallin', "El Hamool", "El Reyad", "Desouk", "Metoubes", "Fuwa", "Sidi Salem"]; // Add more if needed
const validEducationalLevel = ["1st Seconadary", "2nd Secondary", "3rd Secondary"]; // Add more if needed


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
    birthdate : {
        type: Date,
    },
    phoneNumber:{
        type: String,
        match: [/^(010|011|012|015)\d{8}$/
                ,
                `الرجاء إدخال رقم الموبايل بشكل صحيح يبدأ بأحد مزودي الخدمة 
                010/011/012/015 
                ويكون في نطاق 11 رقم`],
        required: true
    },
    educationalLevel:{
        type:String,
        enum: validEducationalLevel,
        required: [true, "Educational Level is required"],
    },
    location: {
        governate: {// المحافظة
          type: String,
          enum: validGovernates,
          required: true
        },
        city: {// المركز
          type: String,
          enum: validCities,
          required: true
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
    // image : { type:String },
})


mongoose.model("students",Schema); //new name for model