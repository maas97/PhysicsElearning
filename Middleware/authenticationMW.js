const jwt = require('jsonwebtoken');
const Student = require("../Model/studentModel")
const Admin = require("../Model/basicAdminModel")

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, 'physics is fun', (err, decodedToken) => {
      if (err) {
        // console.log(err.message);
        res.redirect('/login');
      } else {
        // console.log(decodedToken);
        next();
      }
    });
  } else {
    res.redirect('/login');
  }
};

// check current user to display his name and data
const checkStudent = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
      jwt.verify(token, 'physics is fun', async (err, decodedToken) => {
        if (err) {
          res.locals.user = null;
          res.locals.admin = null;
          next();
        } else {
          let admin = await Admin.findById(decodedToken.id);
          if(admin){
            res.locals.admin = admin;
            res.locals.user = null;

          next();
          } else{
            let student = await Student.findById(decodedToken.id);
            console.log("studenttttttttttttt")
            console.log(student)
            res.locals.user = student;
            res.locals.admin = null;

          next();
          }
        }
          // next();

      });
    } else {
      res.locals.user = null;
      res.locals.admin = null;
      next();
    }
  };

module.exports = { requireAuth, checkStudent };