const mongoose=require("mongoose");
const jwt = require('jsonwebtoken');
const Student = require("../Model/studentModel");
const studentSchema = mongoose.model("student");
const product = require("../Model/productModel");
const productRequest = require("../Model/studentProductModel");
const productSchema = mongoose.model("product");
const productRequestSchema = mongoose.model("productReq");
const courseDetails = require("../Model/courseDetailsInfoModel");
const courseDetailsSchema = mongoose.model("courseDetails");
const day = require("../Model/contentOfCourseModel");
const daySchema = mongoose.model("content");

const { param } = require("../Route/viewRoutes");
const { body } = require("express-validator");

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
    
    // console.log(req.body)
    // console.log(req.body.courseCounter)
    // console.log(req)

    const oneStudentDetails = await studentSchema.findOne({phoneNumber: req.body.studentPhoneNumber});
    // const oneCourseDetails =  studentSchema.find({phoneNumber: req.body.studentPhoneNumber});
    // console.log(oneStudentDetails);
    // console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
    // .findOne()
  
    // Replace 'yourObjectId' with the actual _id of the document you want to update
    const objectIdToUpdate = oneStudentDetails.id;
    // console.log("id")
    // console.log(objectIdToUpdate)
    
    // Replace 'counterValue' with the specific counter value you want to update
    const counterValueToUpdate = req.body.courseCounter;
    // console.log("counter value")
    // console.log(counterValueToUpdate)

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
    
        // console.log("***********************************************");
        // console.log(result);
      
        res.status(200).json({ message: 'Content added successfully' });

    });
    
  }



    module.exports.removeCourseFromStudent = async (req, res) => {
    
      // console.log(req.body)
      // console.log(req.body.removeCourseCounter)
      // console.log(req)
  
      const oneStudentDetails = await studentSchema.findOne({phoneNumber: req.body.studentPhoneNumberToRemoveCourseFrom});
      // const oneCourseDetails =  studentSchema.find({phoneNumber: req.body.studentPhoneNumberToRemoveCourseFrom});
      // console.log(oneStudentDetails);
      // console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
      // .findOne()
    
      // Replace 'yourObjectId' with the actual _id of the document you want to update
      const objectIdToUpdate = oneStudentDetails.id;
      // console.log("id")
      // console.log(objectIdToUpdate)
      
      // Replace 'counterValue' with the specific counter value you want to update
      const counterValueToUpdate = req.body.removeCourseCounter;
      // console.log("counter value")
      // console.log(counterValueToUpdate)
  
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
      
          // console.log("***********************************************");
          // console.log(result);
        
          res.status(200).json({ message: 'Content added successfully' });
        
  
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

        const currentCourseList = await courseDetailsSchema.findOne({counter: req.params.counter});
        // console.log(currentCourseList);
        // console.log(currentCourseList.currentCourseListContentId);
        // console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
        // console.log(await daySchema.findOne( {_id: 6}));
      
        let daysOfCourseArray = [];
        currentCourseList.currentCourseListContentId.forEach( async element => {
            daysOfCourseArray.push(await daySchema.findOne( {_id: element}) );
        });      
      

        setTimeout(()=>{
          // console.log("///////////////////////////****************///////////////////////////////")
          // console.log("Course Days data")
          // console.log(daysOfCourseArray)
          // console.log("///////////////////////////****************///////////////////////////////")
          // console.log(currentCourseList)
        
          daysOfCourseArray.sort((a, b) => a.day.dayNumber - b.day.dayNumber);
          // console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
          // console.log(daysOfCourseArray[daysOfCourseArray.length - 1])
          let lastDayNumber
          if(daysOfCourseArray[daysOfCourseArray.length - 1]){
            lastDayNumber = daysOfCourseArray[daysOfCourseArray.length - 1].day.dayNumber;
          } else {
            lastDayNumber = 0;
          }
      
          // console.log(daysOfCourseArray);
          // console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")

          // console.log(lastDayNumber);
      
      
          res.render('admin/oneCourseDetails', {
            currentCourseList,
            daysOfCourseArray,
            lastDayNumber
          });
        },2000); 

    }


    module.exports.pageOfAddingNewCourse = async (req, res) => {
          res.render('admin/addNewCourse', {
          });
    }

    

    module.exports.pageOfAddingNewDayToCourse = async (req, res) => {
      const oneCourseDetails = await courseDetailsSchema.findOne({counter: req.params.counter});

      res.render('admin/addNewDay', {
        oneCourseDetails
      });
}



module.exports.pageOfAddingNewContentToDay = async (req, res) => {
  const oneDayDetails = await daySchema.findOne({_id: req.params._id});
  const oneCourseDetails = await courseDetailsSchema.findOne({counter: req.params.counter});
// console.log(oneDayDetails)
  res.render('admin/addNewContent', {
    oneDayDetails,
    oneCourseDetails
  });
}


    module.exports.addDayFrontend = async (request,response,next)=>{
      new daySchema({
          day:{
              dayNumber: request.body.dayNumber,
              educationalLevel: request.body.educationalLevel,
              eachContentInsideDay: [{
                  title: request.body.title,
                  description: request.body.description,
                  typeOfContent: request.body.typeOfContent,
                  LinkOfContent: request.body.LinkOfContent
              }]
          }  
      }).save().then(async data=>{
          // console.log(data)
          response.status(201).json({data}); 
          })
          .catch(error=>next(console.log(error)));
    }

    
exports.addContentToDayFrontend = async (request,response,next)=>{

  const newContent = await request.body.eachContentInsideDay; // Content to add
  // console.log(newContent);
  // console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
  // console.log(request.body.id);
    
      try{
      const day = await daySchema.findOne({_id:request.body.id});
      // console.log(day)
      const result = await daySchema.updateOne({//Use return because use of two query actions 
          _id:request.body.id
      },{
          $push:{"day.eachContentInsideDay": newContent}
              
      })
      // console.log("////////////////////////////////////////////")
      // console.log(day)
      // console.log(result)
      response.status(200).json({ message: 'Content added successfully', result });

      }catch{
          next(console.log(error))
      }
      
}

module.exports.products = async (req, res) => {
  const productRequests = await productRequestSchema.find();
  const dataOfProducts = [];

  productRequests.forEach(async (element,index)=>{
    dataOfProducts.push( await productSchema.findOne(element.productId));
  })


  setTimeout(async()=>{
    
    // console.log("/////////////////~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~///////////////////////")
    
    const combinedArray = productRequests.map((item, index) => ({
      ...item,
      productData: dataOfProducts[index], // Assuming the property name is 'value'
    }));
    
  // console.log("@########################@@@@@@@@@@@@@@@@tryyyyyyyyyyyyyyyyyyyyyy@@@@@@@@@@@@@@@^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");

    // console.log(combinedArray);


  // console.log("@########################@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
  // // console.log(students);
  // console.log(productRequests);
  // // console.log(productRequests[0].productId);
  // console.log("@#############!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
  // console.log(dataOfProducts);
  // console.log("@#############!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");

      res.render('admin/productRequests', {
        combinedArray
      });
    },3000); 
}


module.exports.productDelivered = async (req, res) => {

  // console.log(" id of product delivered")
  // console.log(req.body.id)

  productRequestSchema.findOne({
    _id:req.body.id
    }).then((data)=>{
      // console.log("data")
      // console.log(data)
        if(!data){
            throw new Error("Request is not found");
        }   
        return productRequestSchema.updateOne({//Use return because use of two query actions 
            _id:req.body.id
        },{
            $set:{
              isDelivered: true,
            }
        })   
    })
    .then(data=>{
      // console.log("after delivery")
      // console.log(data)
                res.status(201).json({data});
               
        })
        .catch(error=>next(error));
    
}

module.exports.showProducts = async (req, res) => {    
  const products = await productSchema.find();
  // console.log(products);

  res.render('admin/products', {
    products
  });
}


module.exports.addNewProducts = async (req, res) => {    
      res.render('admin/addNewProduct', {
      });
}


