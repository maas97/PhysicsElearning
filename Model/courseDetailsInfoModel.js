const mongoose = require("mongoose")
const AutoIncrement = require('mongoose-sequence')(mongoose);
require('./contentOfCourseModel');
const contentSchema = mongoose.model("content");




const Schema = new mongoose.Schema({
    _id: {
      type: mongoose.Types.ObjectId,
      default: () => new mongoose.Types.ObjectId() // Generate a new ObjectId as the default value
    },
    counter:{
      type: Number
    },
    courseName:{
      type: String,
        required: [true, "Course Name is required"],
    },
    courseDescription:{
      type: String,  
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
    month:{
      type: Number,
      match: [/^(?:[1-9]|1[0-2])$/
      ,
     ` الرجاء إدخال شهر من 1 إلى 12`],
     required: [true, "month is required"],
    },
    price :{
      type:Number,
      required: [true, "Price is required"],
    },
    // isCurrentCourseSubscribed:{
    //   type: Boolean,
    //   default: false
    // }
    // ,
    createdAt:{
      type: Date,
      default: Date.now()
    },
    currentCourseListContentId:
    [
      {
      type: Number,
      ref: "content",
      // required: [true , "A lesson must have a course day"],
      }
    ]
})


Schema.plugin(AutoIncrement,{
    id: 'courseDetails',
    inc_field: "counter"
});

mongoose.model("courseDetails",Schema); //new name for model