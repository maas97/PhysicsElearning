
const mongoose=require("mongoose");
const jwt = require('jsonwebtoken');
const Student = require("../Model/studentModel");
const studentSchema = mongoose.model("student");
const product = require("../Model/productModel");
const productSchema = mongoose.model("product");
const studentProduct = require("../Model/studentProductModel");
const productRequestSchema = mongoose.model("productReq");
const courseDetails = require("../Model/courseDetailsInfoModel");
const courseDetailsSchema = mongoose.model("courseDetails");
const day = require("../Model/contentOfCourseModel");
const daySchema = mongoose.model("content");

const { param } = require("../Route/viewRoutes");


process.on('uncaughtException', function (error) {
  // console.log(error.stack);
});

module.exports.home = (req, res) => {
  res.render('index');
}


/* Courses */

module.exports.coursesInfo = async (req, res) => {
  const authToken = req.cookies.jwt;
  if (authToken) {
    jwt.verify(authToken, 'physics is fun', async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        res.locals.admin = null;
        next();
      } else {
      console.log("##############################tokennnnnnnnnnnnn#######################################");
        console.log(authToken);
        console.log("##############################tokennnnnnnnnnnnn#######################################");
        console.log(authToken);

        const student = await studentSchema.findById(decodedToken.id);
      console.log("#####################################################################");
           
      let subscribedCourseDetails =[];
      student.coursesSubscribedTo.forEach( async element => {
        if(element.isConfirmed === true){
          subscribedCourseDetails.push(await courseDetailsSchema.findOne( {counter: element.counter}) );
        }      
      });

      let requestedCourseDetails = [];
      student.coursesSubscribedTo.forEach( async element => {
        if(element.isRequested === true){
          requestedCourseDetails.push(await courseDetailsSchema.findOne( {counter: element.counter}) );
        }      
      });

      let allCourses = await courseDetailsSchema.find();
      let allCounter = await courseDetailsSchema.find({},{counter:1,_id:0});
    
      const subscribedCounterArray = subscribedCourseDetails.map(object => object.counter);
      const requestedCounterArray = requestedCourseDetails.map(object => object.counter);

      console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^")
      console.log("sub counter")
      console.log(subscribedCounterArray)
      console.log("req counter")
      console.log(requestedCounterArray)

      const allCounterArray = allCounter.map(obj => obj.counter);
      console.log("all counter")
      console.log(allCounterArray)

      const preUnsubscribedCounterArray = allCounterArray.filter(item => !requestedCounterArray.includes(item));
      const unsubscribedCounterArray = preUnsubscribedCounterArray.filter(item=> !subscribedCounterArray.includes(item));
      console.log("unsub counter")
      console.log(unsubscribedCounterArray)

      let unSubscribedCourseDetails =[];
      unsubscribedCounterArray.forEach(async element=>{
      unSubscribedCourseDetails.push(await courseDetailsSchema.findOne({counter: element}))

      });
      setTimeout(()=>{
        console.log("///////////////////////////****************///////////////////////////////")
        console.log("student data")
        console.log(student)
        console.log("Requested Course Details")
        console.log(requestedCourseDetails)
        console.log("subscribed courses")
        console.log(subscribedCourseDetails)
        console.log("all courses")
        console.log(allCourses)
        console.log("unsubscribed courses")
        console.log(unSubscribedCourseDetails)
      
        res.render('myCoursesInfo', {
          title: 'كورساتي',
          student,
          requestedCourseDetails,
          subscribedCourseDetails,
          allCourses,
          unsubscribedCounterArray,
          unSubscribedCourseDetails
        });
      },3000);       
      }
    })
  }
}



module.exports.getOneCoursedetails = async (req, res) => {
  const oneCourseDetails = await courseDetailsSchema.findOne({counter: req.params.counter});
  res.render('oneCourseInfo', {
      title: 'كورساتي',
      oneCourseDetails
    });
}


module.exports.requestCourse = async (req, res, next) => {
  const authToken = req.cookies.jwt;

  if (authToken) {
    jwt.verify(authToken, 'physics is fun', async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
          let student = await studentSchema.updateOne( {_id: decodedToken.id},
            {$push: {coursesSubscribedTo : {counter: req.params.counter, isRequested:true} } }
          ).then((data)=>{
            if(!data){
                throw new Error("Student is not found");
            }   
            // console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
            // console.log(data);
            // console.log(data.id);
            // // console.log(data.counter);
            // console.log(req.params);
            // console.log(req.params.counter);
        }).then( async data =>{
            let studentData = await studentSchema.findById(decodedToken.id);
            // console.log(studentData);
            // console.log("///////************************************/////////******************//////////////")
            res.locals.user = studentData;
            res.locals.counter = req.params.counter;
            // console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%")
            // console.log(res.locals.counter);
            // res.status(200).json({data});
            res.render('subscribedDone');
          })

          next();
      }
    });
  }  
}

module.exports.courseList = async (req, res) => {
  const currentCourseList = await courseDetailsSchema.findOne({counter: req.params.counter});
  console.log(currentCourseList);
  console.log(currentCourseList.currentCourseListContentId);
  console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
  // console.log(await daySchema.findOne( {_id: 6}));

  let daysOfCourseArray = [];
  currentCourseList.currentCourseListContentId.forEach( async element => {
      daysOfCourseArray.push(await daySchema.findOne( {_id: element}) );
  });
  // console.log(daysOfCourseArray);


  setTimeout(()=>{
    console.log("///////////////////////////****************///////////////////////////////")
    console.log("Course Days data")
    console.log(daysOfCourseArray)
    console.log("///////////////////////////****************///////////////////////////////")
    console.log(currentCourseList)
  
    daysOfCourseArray.sort((a, b) => a.day.dayNumber - b.day.dayNumber);
    console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")

    console.log(daysOfCourseArray);


    res.render('courseList', {
      title: 'كورساتي',
      currentCourseList,
      daysOfCourseArray
    });
  },3000); 




}



/* Products */

module.exports.products = async(req, res) => {

const products = await productSchema.find() ;
console.log(products)

        res.render('productsListInfo', {
          title: 'مذكراتي',
          products
        });  
  }

  module.exports.getOneProductDetails = async (req, res) => {
    const oneProductDetails = await productSchema.findOne({counter: req.params.counter});
    res.render('oneProductRequest', {
        title: 'مذكراتي',
        oneProductDetails
      });
  }


  

module.exports.requestProduct = (req,res,next)=>{
  new productRequestSchema({
      firstName:  req.body.firstName,
      lastName:   req.body.lastName,
      firstPhoneNumber:   req.body.firstPhoneNumber,
      secondPhoneNumber:  req.body.secondPhoneNumber,
      location: {
        governate: req.body.governate,
        city:req.body.city,
        area:req.body.area,
      },   
      productId:req.body.productId,
  }).save()// insertOne
  .then(productRequest=>{
    console.log(productRequest)
      res.status(201).json({productRequest});
  })
  .catch((error)=>{
    console.log(error)
      res.status(400).json({ error });
  });
}



module.exports.freeExams = (req, res) => {
  res.render('soonTemplate');
}




module.exports.profile = (req, res) => {
  res.render('profile');
}


