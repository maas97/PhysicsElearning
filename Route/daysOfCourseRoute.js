const express=require("express")
const router = express.Router();    
const daysOfCourseValidation = require("../Core/Validation/daysOfCourseValidation");
const validateMW = require("../Core/Validation/validateMW");
const controller = require("../Controller/daysOfCourseController");
// const authorization = require("../Middleware/authorization");

router
    .route("/daysOfCourse")
    // .all(authorization.checkRoot)
    .get(controller.getAlldaysOfCourses)
    .post(daysOfCourseValidation.post ,validateMW ,controller.addDayOfCourse)
    .patch(daysOfCourseValidation.update ,validateMW ,controller.updateDayofCourse)
    // upload("basicAdmin"),
    .delete(daysOfCourseValidation.delete ,validateMW ,controller.deleteDayOfCourse);

router
    .route("/daysOfCourse/:id")
    .get(controller.getDayOfCourseById);

module.exports = router;