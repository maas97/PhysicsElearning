const mongoose=require("mongoose");
require("../Model/studentModel");
const fs =require("fs") 
const bcrypt = require("bcryptjs");
const path = require("path");
const saltRounds = 10
const salt = bcrypt.genSaltSync(saltRounds);
const jwt = require("jsonwebtoken");
require("cookie-parser");
const studentSchema = mongoose.model("student");


// // handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: '', password: '' };

  // duplicate email error
  if (err.code === 11000) {
    errors.email = 'that email is already registered';
    return errors;
  }
}

//   // validation errors
//   if (err.message.includes('user validation failed')) {
//     // console.log(err);
//     Object.values(err.errors).forEach(({ properties }) => {
//       // console.log(val);
//       // console.log(properties);
//       errors[properties.path] = properties.message;
//     });
//   }

//   return errors;
// }

// creating token function

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id)=>{
  return jwt.sign({id}, "physics", {expiresIn: maxAge});
};

// controller actions


module.exports.signup_get = (req, res) => {
  res.render('signup');
}

module.exports.login_get = (req, res) => {
  res.render('login');
}

module.exports.home = (req, res) => {
  res.render('home');
}

module.exports.signup_post = (request,response,next)=>{
  new studentSchema({
      password: bcrypt.hashSync(request.body.password, salt),
      email:request.body.email,
  }).save()// insertOne
  .then(student=>{
      const token = createToken(student._id);
      console.log(student._id);
      response.cookie("jwt", token, {httpOnly: true, maxAge: maxAge * 1000});
      response.status(201).json({student: student._id});
  })
  .catch((error)=>{
    // const errors = handleErrors(error);
    // console.log(errors);
    // response.status(400).json({ errors });
    next(error)});
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

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  res.send('user login');
}