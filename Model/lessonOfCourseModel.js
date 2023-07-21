const mongoose = require("mongoose")


const validGovernates = ['Cairo', 'Alexandria', 'Giza', 'Kafr El Sheikh', 'Al Dakahlia']; // Add more if needed
const validCities = ['Qallin', "El Hamool", "El Reyad", "Desouk", "Metoubes", "Fuwa", "Sidi Salem"]; // Add more if needed
const validEducationalLevel = ["1st Seconadary", "2nd Secondary", "3rd Secondary"]; // Add more if needed


const Schema = new mongoose.Schema({
    _id: {
        type: mongoose.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId() // Generate a new ObjectId as the default value
      },
    title:{
        type:String,
        required: [true, "Title is required"],
    },
    description :{
        type: String,
        required: [true, "Description is required"],
    },
    videoLink:{
      type: String,
      required: [true, "Description is required"],
      match: [
        /^(https?:\/\/)([^\s\/$.?#]+\.[^\s]*)$/,
        "Please enter a valid link for the lesson"
    ],
    },
    dayOfCourse :{
      type: String,
      required: [true, "Description is required"],
  },
})


mongoose.model("lessons",Schema); //new name for model