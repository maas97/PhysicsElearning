const express=require("express")
const router = express.Router();    
const courseDetailsValidation = require("../Core/Validation/courseDetailsValidation");
const validateMW = require("../Core/Validation/validateMW");
const controller = require("../Controller/courseDetailsController");
const contentOfCourseRoute = require("./contentOfCourseRoute");
// const authorization = require("../Middleware/authorization");

router
    .route("/coursedetails")
    // .all(authorization.checkRoot)
    .get(controller.getAllCoursesDetails)
    .post(courseDetailsValidation.post ,validateMW ,controller.addCourseDetails)
    .patch(courseDetailsValidation.update ,validateMW ,controller.updateCourseDetails)
    .delete(courseDetailsValidation.delete ,validateMW ,controller.deleteCourseDetails);

router
    .route("/coursedetails/:id")
    .get(controller.getCourseDetailsById);


module.exports = router;