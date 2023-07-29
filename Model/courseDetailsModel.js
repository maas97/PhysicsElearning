const mongoose = require("mongoose")
// const AutoIncrement = require('mongoose-sequence')(mongoose);
const validEducationalLevel = ["1st Secondary", "2nd Secondary", "3rd Secondary"]; // Add more if needed
const validSemester = ["1st", "2nd"];


const Schema = new mongoose.Schema({
    _id: {
      type: mongoose.Types.ObjectId,
      default: () => new mongoose.Types.ObjectId() // Generate a new ObjectId as the default value
    },
    courseName:{
      type: String,
        required: [true, "Course Name is required"],
    },
    courseDescription:{
      type: String,
      required: [true, "Course Description is required"],
  
    },
    educationalLevel:{
        type:String,
        enum: validEducationalLevel,
        required: [true, "Educational Level is required"],
    },
    semester:{
      type:String,
      enum: validSemester,
      required: [true, "Semester is required"],
    },
    month:{
      type: Number,
      match: [/^(?:[1-9]|1[0-2])$/
      ,
     ` الرجاء إدخال شهر من 1 إلى 12`],
    },
    price :{
      type:Number,
      required: [true, "Price is required"],
    },
    courseList:{
        type:Number,
        ref: "content",
        // required: [true, "Day Number is required"],
    }
})


// Schema.plugin(AutoIncrement,{
//     id: 'courseDetails',
//     inc_field: "_id"
// });

mongoose.model("courseDetails",Schema); //new name for model