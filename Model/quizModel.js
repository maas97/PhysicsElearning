const mongoose = require("mongoose")

const validEducationalLevel = ["1st Secondary", "2nd Secondary", "3rd Secondary"]; // Add more if needed
const validSemester = ["1st", "2nd"];
const validTypeOfQuiz = ["quizOfLesson", "quizOfUnit", "quizOfSemester", "other"];

const Schema = new mongoose.Schema({
    _id: {
        type: mongoose.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId() // Generate a new ObjectId as the default value
      },
    quizName:{
        type:String,
        required: [true, "Quiz name is required"],
    },
    quizType :{
        type: String,
        enum: validTypeOfQuiz,
        required: [true, "Quiz type is required"],
    },
    quizDescription:{
      type:String,
      required: [true, "Quiz description is required"],    
    },
    noOfQuestions:{
        type: Number,
        required: [true, "Number of questions is required"]
    },
    educationalLevel:{
      type: String,
      enum: validEducationalLevel,
      required: [true, "Educational level is required"],
    },
    semester :{
      type: String,
      enum: validSemester,
      required: [true, "semester is required"],
  }
})


mongoose.model("quiz",Schema); //new name for model