const mongoose=require("mongoose");
const jwt = require('jsonwebtoken');
const Student = require("../Model/studentModel");
const studentSchema = mongoose.model("student");
const product = require("../Model/productModel");
const Product = require("../Model/studentProductModel");
const productSchema = mongoose.model("product");
const productRequest = mongoose.model("productRequest");
const courseDetails = require("../Model/courseDetailsInfoModel");
const courseDetailsSchema = mongoose.model("courseDetails");
const day = require("../Model/contentOfCourseModel");
const daySchema = mongoose.model("content");

const { param } = require("../Route/viewRoutes");

process.on('uncaughtException', function (error) {
    // console.log(error.stack);
  });


  module.exports.students = async (req, res) => {
    const students = await studentSchema.find();
    setTimeout(()=>{
    // console.log("@########################@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
    // console.log(students);
        res.render('admin/students', {
          students
        });
      },2000); 
  }
  

  module.exports.getOneStudent = async (req, res) => {
    // console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
    // console.log(req.params.phoneNumber);
    const oneStudentDetails = await studentSchema.findOne({phoneNumber: req.params.phoneNumber});
    
    // console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$1");
    // console.log(oneStudentDetails);

    let subscribedCourseDetails =[];
    oneStudentDetails.coursesSubscribedTo.forEach( async element => {
      if(element.isConfirmed === true){
        subscribedCourseDetails.push(await courseDetailsSchema.findOne( {counter: element.counter}) );
      }      
    });

    // console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$2");
    // console.log(subscribedCourseDetails);

    let requestedCourseDetails = [];
    oneStudentDetails.coursesSubscribedTo.forEach( async element => {
      if(element.isRequested === true){
        requestedCourseDetails.push(await courseDetailsSchema.findOne( {counter: element.counter}) );
      }      
    });

    // console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$3");
    // console.log(requestedCourseDetails);

    let allCourses = await courseDetailsSchema.find();
    let allCounter = await courseDetailsSchema.find({},{counter:1,_id:0});
  
    const subscribedCounterArray = subscribedCourseDetails.map(object => object.counter);
    const requestedCounterArray = requestedCourseDetails.map(object => object.counter);

    // console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^")
    // console.log("sub counter")
    // console.log(subscribedCounterArray)
    // console.log("req counter")
    // console.log(requestedCounterArray)

    const allCounterArray = allCounter.map(obj => obj.counter);
    // console.log("all counter")
    // console.log(allCounterArray)

    const preUnsubscribedCounterArray = allCounterArray.filter(item => !requestedCounterArray.includes(item));
    const unsubscribedCounterArray = preUnsubscribedCounterArray.filter(item=> !subscribedCounterArray.includes(item));
    // console.log("unsub counter")
    // console.log(unsubscribedCounterArray)

    let unSubscribedCourseDetails =[];
    unsubscribedCounterArray.forEach(async element=>{
    unSubscribedCourseDetails.push(await courseDetailsSchema.findOne({counter: element}))
    });

  setTimeout(()=>{
    // let coursesCounters = [];
    // oneStudentDetails.coursesSubscribedTo.forEach( async element => {
    //       console.log("))))))))))))))))))))))))))))))))))))))))))))))))))))");  
    //       console.log(element.counter)
    //       coursesCounters.push(element.counter );
    //   });
    // console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$1");
    // console.log(oneStudentDetails)

    // console.log("$$$$$$$$$$$$$$$$$$$$$$$sub$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$2");
    // console.log(subscribedCourseDetails);

    // console.log("$$$$$$$$$$$$$$$$$$$$$$$$$req$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$3");
    // console.log(requestedCourseDetails);

    // console.log("unsubscribed courses")
    // console.log(unSubscribedCourseDetails)

        res.render('admin/oneStudentDetails', {
          oneStudentDetails,
          subscribedCourseDetails,
          requestedCourseDetails,
          unSubscribedCourseDetails
        });
      },2000); 

  }

  module.exports.confirmCourseForStudent = async (req, res) => {
    
    console.log(req.body)
    console.log(req.body.courseCounter)
    // console.log(req)

    const oneStudentDetails = await studentSchema.findOne({phoneNumber: req.body.studentPhoneNumber});
    // const oneCourseDetails =  studentSchema.find({phoneNumber: req.body.studentPhoneNumber});
    console.log(oneStudentDetails);
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
    // .findOne()
  
    // Replace 'yourObjectId' with the actual _id of the document you want to update
    const objectIdToUpdate = oneStudentDetails.id;
    console.log("id")
    console.log(objectIdToUpdate)
    
    // Replace 'counterValue' with the specific counter value you want to update
    const counterValueToUpdate = req.body.courseCounter;
    console.log("counter value")
    console.log(counterValueToUpdate)

    const filter = {
        _id: objectIdToUpdate,
        'coursesSubscribedTo.counter': counterValueToUpdate
    };
    
    const update = {
        $set: {
            'coursesSubscribedTo.$.isRequested': false,
            'coursesSubscribedTo.$.isConfirmed': true
        }
    };
    
    studentSchema.updateOne(filter, update, (err, result) => {
        if (err) {
            console.error(err);
            return;
        }
    
        console.log("***********************************************");
        console.log(result);
      

    });
    
  }



    module.exports.removeCourseFromStudent = async (req, res) => {
    
      console.log(req.body)
      console.log(req.body.removeCourseCounter)
      // console.log(req)
  
      const oneStudentDetails = await studentSchema.findOne({phoneNumber: req.body.studentPhoneNumberToRemoveCourseFrom});
      // const oneCourseDetails =  studentSchema.find({phoneNumber: req.body.studentPhoneNumberToRemoveCourseFrom});
      console.log(oneStudentDetails);
      console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
      // .findOne()
    
      // Replace 'yourObjectId' with the actual _id of the document you want to update
      const objectIdToUpdate = oneStudentDetails.id;
      console.log("id")
      console.log(objectIdToUpdate)
      
      // Replace 'counterValue' with the specific counter value you want to update
      const counterValueToUpdate = req.body.removeCourseCounter;
      console.log("counter value")
      console.log(counterValueToUpdate)
  
      const filter = {
          _id: objectIdToUpdate,
          'coursesSubscribedTo.counter': counterValueToUpdate
      };
      
      const update = {
          $set: {
              'coursesSubscribedTo.$.isRequested': true,
              'coursesSubscribedTo.$.isConfirmed': false
          }
      };
      
      studentSchema.updateOne(filter, update, (err, result) => {
          if (err) {
              console.error(err);
              return;
          }
      
          console.log("***********************************************");
          console.log(result);
        
  
      })
      
    }
 


    module.exports.courses = async (req, res) => {
      const courses = await courseDetailsSchema.find();
      setTimeout(()=>{
      // console.log("@########################@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
      // console.log(students);
          res.render('admin/courses', {
            courses
          });
        },2000); 
    }


    module.exports.getOneCourse = async (req, res) => {
      // const courses = await courseDetailsSchema.find();
    const oneCourseDetails = await courseDetailsSchema.findOne({counter: req.params.counter});
      
      setTimeout(()=>{
      console.log("@########################@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
      console.log(oneCourseDetails);
          res.render('admin/oneCourseDetails.ejs', {
            oneCourseDetails
          });
        },2000); 
    }