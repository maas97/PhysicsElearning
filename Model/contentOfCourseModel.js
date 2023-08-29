const mongoose = require("mongoose")
const AutoIncrement = require('mongoose-sequence')(mongoose);


// ضيف ان جوا كل محتوى في unit بتبقى شاملة المحتويات دي جواها
// وال unit دي جوا نفس ال course جواه اكتر من unit

const Schema = new mongoose.Schema({
    _id: {
        type: Number
      },
      day:{
                  dayNumber:
                  {
                    type: Number
                  },
                  educationalLevel: {
                    type: Number,
                    match: [/^[123]$/,
                          `الرجاء إدخال سنة دراسية مناسبة`],
                  },
                  eachContentInsideDay:[
                  {
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
                            required: [true, "Type of lesson is required"]
                          },
                          LinkOfContent:{
                            type: String,
                            required: [true, "Link is required"]
                          },
                          dateOfPublishingContent :{
                            type: Date,
                            default: Date.now
                          }
                  }],
      }
      
})


Schema.plugin(AutoIncrement,{
  id: 'content',
  inc_field: "_id"
});



mongoose.model("content",Schema); //new name for model