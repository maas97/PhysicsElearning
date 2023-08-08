const mongoose = require("mongoose")
const AutoIncrement = require('mongoose-sequence')(mongoose);

const typeOfContent = ["video", "file"]; // Add more if needed

// ضيف ان جوا كل محتوى في unit بتبقى شاملة المحتويات دي جواها
// وال unit دي جوا نفس ال course جواه اكتر من unit

const Schema = new mongoose.Schema({
    _id: {
        type: Number
      },
      unit:[{
                  unitNumber:
                  {
                    type: Number
                  },
                  eachContentInsideCourse:
                  [{
                            title:{
                              type:String,
                              required: [true, "Title is required"],
                          },
                          description :{
                              type: String,
                              required: [true, "Description is required"],
                          },
                          typeOfContent:{
                            type:String,
                            enum: typeOfContent,
                            required: [true, "Type of lesson is required"]
                          },
                          LinkOfContent:{
                            type: String,
                            required: [true, "Link is required"],
                          //   match: [
                          //     /^(https?:\/\/)([^\s\/$.?#]+\.[^\s]*)$/,
                          //     "Please enter a valid link for the lesson"
                          // ]
                          },
                          dateOfPublishingContent :{
                            type: Date,
                            required: [true, "Description is required"],
                            default: Date.now
                          }
                  }],
      }]
      
})


Schema.plugin(AutoIncrement,{
  id: 'content',
  inc_field: "_id"
});



mongoose.model("content",Schema); //new name for model