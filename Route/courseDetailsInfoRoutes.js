const express=require("express")
const router = express.Router();    
const courseDetailsValidation = require("../Core/Validation/courseDetailsInfoValidation");
const validateMW = require("../Core/Validation/validateMW");
const controller = require("../Controller/courseDetailsInfoController");
const contentOfCourseRoute = require("./contentOfCourseRoutes");

router
    .route("/coursedetails")
    .get(controller.getAllCoursesDetails)
    .post(courseDetailsValidation.post ,validateMW ,controller.addCourseDetails)
    .patch(courseDetailsValidation.update ,validateMW ,controller.updateCourseDetails)
    .delete(courseDetailsValidation.delete ,validateMW ,controller.deleteCourseDetails);

    router
    .route("/addDayToCourse")
    .post(controller.addDayToCourse);


router
    .route("/coursedetails/:id")
    .get(controller.getCourseDetailsById);


module.exports = router;