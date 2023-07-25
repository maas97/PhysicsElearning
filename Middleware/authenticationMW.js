const jwt = require('jsonwebtoken');
const Student = require("../Model/studentModel")

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, 'physics is fun', (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect('/login');
      } else {
        console.log(decodedToken);
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
          next();
        } else {
          let student = await Student.findById(decodedToken.id);
          res.locals.user = student;
          next();
        }
      });
    } else {
      res.locals.user = null;
      next();
    }
  };

module.exports = { requireAuth, checkStudent };