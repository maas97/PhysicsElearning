const mongoose = require("mongoose")
const AutoIncrement = require('mongoose-sequence')(mongoose);
const validEducationalLevel = ["1st Seconadary", "2nd Secondary", "3rd Secondary"]; // Add more if needed
const validSemester = ["1st", "2nd"];


const Schema = new mongoose.Schema({
    _id: {
        type: Number,
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
})


Schema.plugin(AutoIncrement,{
    id: 'basicAdminCounter',
    inc_field: "_id"
});

mongoose.model("daysOfCourse",Schema); //new name for model