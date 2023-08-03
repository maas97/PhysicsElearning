const express=require("express")
const router = express.Router();    
const studentValidation = require("../Core/Validation/studentValidation");
const validateMW = require("../Core/Validation/validateMW");
const controller = require("../Controller/studentController");
// const upload = require("../Core/helper/uploadImage");
// const authorization = require("../Middleware/authorization");

router
    .route("/students")
    // .all(authorization.checkRoot)
    .get(controller.getAllstudents)
    .post(studentValidation.post ,validateMW ,controller.addStudent)
    .patch(studentValidation.update ,validateMW ,controller.updateStudent)
    // upload("basicAdmin"),
    .delete(validateMW ,controller.deleteStudent);

router
    .route("/students/:id")
    .get(controller.getStudentById);

module.exports = router;