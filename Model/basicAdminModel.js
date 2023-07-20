const mongoose = require("mongoose")
// const AutoIncrement = require('mongoose-sequence')(mongoose);

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
            'الرجاء إدخال إيميل صحيح يجب ان ينتهي ب gmail/yahoo/hotmail/outlook'
        ],
    },
    birthdate : {
        type: Date,
        // validate: {
        //     validator: function (v) {
        //     return /(^0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-(\d{4}$)/.test(v);
        //     },
        //     message: "Please enter a valid date",
        // }, 
    },
    // image : { type:String },
})

// Schema.plugin(AutoIncrement,{
//     id: 'basicAdminCounter',
//     inc_field: "_id"
// });

mongoose.model("basicAdmins",Schema); //new name for model