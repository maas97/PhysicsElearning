const mongoose=require("mongoose");
const Student = require("../Model/studentModel");
const Admin = require("../Model/basicAdminModel");
const fs =require("fs") 
const bcrypt = require("bcryptjs");
const path = require("path");
const saltRounds = 10
const salt = bcrypt.genSaltSync(saltRounds);
const jwt = require("jsonwebtoken");
require("cookie-parser");
const studentSchema = mongoose.model("student");
const adminSchema = mongoose.model("basicAdmin");
const {courseDetails} = require("./courseDetailsInfoController");

process.on('uncaughtException', function (error) {
  // console.log(error.stack);
});

// // handle errors
const handleErrors = (err) => {
  // console.log(err.code);
  // console.log(err.message);
  let errors = { email: '', password:'', phoneNumber: '', parentPhoneNumber: ''};

  //login errors
  if(err.message === 'incorrect phone number'){
    errors.phoneNumber = "رقم الهاتف أو كلمة المرور غير صحيحة"
  }
  if(err.message === "Incorrect Password"){
    errors.password = "رقم الهاتف أو كلمة المرور غير صحيحة"
  }
  // console.log("*****************************************************************************");

  // console.log(err.message);

  // console.log("*****************************************************************************");

  // duplicate email error
  if (err.code === 11000) {
    // console.log(err.code);
    if (err.message.includes("phoneNumber")) {
      errors.phoneNumber = 'رقم الطالب مسجل مسبقا على منصتنا';
    }
    if (err.message.includes("parentPhoneNumber")) {
      errors.parentPhoneNumber = 'رقم ولي الأمر مسجل مسبقا على منصتنا';
    }
    if (err.message.includes("email")) {
      errors.email = 'هذا الإيميل لديه أكونت مسبقا على منصتنا برجاء تسجيل الدخول';
    }
    
    // console.log(errors);
    // console.log(errors.email);
    
    return errors;
  }


  // validation errors
  // console.log("////////////////////////////////////////////////////////////////////////////");

  // console.log(err);

  // console.log("////////////////////////////////////////////////////////////////////////////");

  if (err.message.includes('student validation failed')) {
    // console.log(err);
    Object.values(err.errors).forEach(({ properties }) => {
      // console.log(val);
      // console.log(properties);
      errors[properties.path] = properties.message;
    });
  }

  return errors;
}

// creating token function

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id)=>{
  return jwt.sign({id}, "physics is fun", {expiresIn: maxAge});
};

// controller actions


module.exports.login_get = (req, res) => {
  res.render('login');
}

module.exports.logout_get = (req, res) => {
  res.cookie('jwt', '', {maxAge: 1})
  res.redirect('/');
}



module.exports.courses = async (req, res) => {
  await fetch ("/coursedetails", {
    method: "GET",
    headers: {"Content-Type":"application/json"}
  }).then(data =>{
    res.status(200).json({data});
    res.render('myCourses', );
  })
}




module.exports.signup_post = (req,res,next)=>{
  new studentSchema({
      firstName:  req.body.firstName,
      lastName:   req.body.lastName,
      password:   bcrypt.hashSync(req.body.password, salt),
      email:      req.body.email,
      age:        req.body.age,
      phoneNumber:req.body.phoneNumber,
      parentPhoneNumber:req.body.parentPhoneNumber,
      educationalLevel:req.body.educationalLevel,
  }).save()// insertOne
  .then(student=>{
      // console.log(student);
      const token = createToken(student._id);
      // console.log(student._id);
      res.cookie("jwt", token, {httpOnly: true, maxAge: maxAge * 1000});
      res.status(201).json({student: student._id});
  })
  .catch((error)=>{
    // console.log(error);
    // console.log("****************************************************************");
    // console.log(error.errors.email);
    // console.log("/////////////////////////////////////////////////////////////////");
    const errors = handleErrors(error);
    // console.log(errors);
    // if(errors.email === '' && errors.password === ''){
    //   // for any errors other than duplicate email
    //   const emailErrorMessage = {message: error.errors.email.properties.message};
    //   // console.log("*****************************************************************************");
    //   console.log(emailErrorMessage);
    //   if(emailErrorMessage){
    //   res.status(400).json( emailErrorMessage );
    //   }
      // res.status(400).json({ errors });
      // console.log(errorMessage);
    // }
    // else{
      // console.log("*****************************************************************************");

      // console.log(errors);
      res.status(400).json({ errors });
    // }
    // next(error)
  });
}



// async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const student = await Student.create({ email, password });
//     console.log(student);

//     // const token = createToken(user._id);
//     // res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
//     res.status(201).json(student);
//     console.log(student);
//   }
//   catch(err) {
//     // const errors = handleErrors(err);
//     // res.status(400).json({ errors });
//   }
 
// }

module.exports.login_post = async (req, res, next) => {
  const { phoneNumber, password } = req.body;
  console.log(req.body);
  try {
    const admin = await Admin.login(phoneNumber, password);
    console.log("===========================login controller admin=================================");
      console.log(admin);
      console.log("============================================================");
    if(admin){
      const token = createToken(admin._id);
      res.cookie("jwt", token, {httpOnly: true, maxAge: maxAge * 1000});
      res.status(200).json({ admin: admin._id });
    }else{
      const student = await Student.login(phoneNumber, password);
      const token = createToken(student._id);
      console.log("===========================login controller student=================================");
      console.log(token);
      console.log("============================================================");
      res.cookie("jwt", token, {httpOnly: true, maxAge: maxAge * 1000});
      res.status(200).json({ student: student._id });
      // console.log(student._id);
      // console.log(phoneNumber, password);
  
    }

  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({errors});
    // next(errors);
  }

}