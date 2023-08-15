const mongoose=require("mongoose");
const jwt = require('jsonwebtoken');
const Student = require("../Model/studentModel");
const studentSchema = mongoose.model("student");
const courseDetails = require("../Model/courseDetailsInfoModel");
const { param } = require("../Route/viewRoutes");
const courseDetailsSchema = mongoose.model("courseDetails");


process.on('uncaughtException', function (error) {
  // console.log(error.stack);
});

module.exports.home = (req, res) => {
  res.render('index');
}

module.exports.coursesInfo = async (req, res) => {
    const availableCourses = await courseDetailsSchema.find();
    for(let availableCourse of availableCourses){
      // console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
      // console.log(availableCourse.isCurrentCourseSubscribed);
    }
    res.render('myCoursesInfo', {
        title: 'كورساتي',
        availableCourses
      });
}

module.exports.getOneCoursedetails = async (req, res) => {
  const oneCourseDetails = await courseDetailsSchema.findOne({counter: req.params.counter});
  // console.log("/////////////////////////////////////////////////////////")
  // console.log(oneCourseDetails)
  // console.log("/////////////////////////////////////////////////////////")

  res.render('oneCourseInfo', {
      title: 'كورساتي',
      oneCourseDetails
    });
}

module.exports.subscribed = async (req, res, next) => {
  const authToken = req.cookies.jwt;

  if (authToken) {
    jwt.verify(authToken, 'physics is fun', async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
          let student = await studentSchema.findById(decodedToken.id).then((data)=>{
            if(!data){
                throw new Error("Student is not found");
            }   
            // console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
            // console.log(data.id);
            return studentSchema.updateOne({//Use return because use of two query actions 
                _id:  data.id
            },{
                $set:{
                  isSubscriped: "true",
                }
            })   
        }).then(async data=>{
          let counterNumber = await req.params;
          let courseDetails = await courseDetailsSchema.findOne({counter:counterNumber.counter}).then(courseData=>{
            if(!courseData){
              throw new Error("Course is not found");
          } 
          return courseDetailsSchema.updateOne({//Use return because use of two query actions 
            counter: courseData.counter
          },{
              $set:{
                  isCurrentCourseSubscribed: "true",
              }
          });
          }).then( async data =>{
            let studentData = await studentSchema.findById(decodedToken.id);
            // console.log("///////************************************///////*******************////////////////")
            // console.log(data);
            // console.log(counterNumber);
            // console.log(studentData);
            // console.log("///////************************************/////////******************//////////////")
            res.locals.user = studentData;
            res.locals.counter = counterNumber.counter;
            // console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%")
            // console.log(res.locals.counter);
            
            // res.status(200).json({data});
            res.render('subscribedDone');
          })
          
        })

          next();
      }
    });
  }  
}



module.exports.courseList = async (req, res) => {
    res.render('courseList');
}

module.exports.freeExams = (req, res) => {
  res.render('soonTemplate');
}
module.exports.profile = (req, res) => {
  res.render('profile');
}

module.exports.products = (req, res) => {
  res.render('soonTemplate');
}