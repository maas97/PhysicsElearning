const express=require("express")
const router = express.Router();    
// const studentValidation = require("../Core/Validation/contentValidation");
const validateMW = require("../Core/Validation/validateMW");
const controller = require("../Controller/contentOfCourseController");

router
    .route("/days")
    // .all(authorization.checkRoot)
    .get(controller.getAllDays)
    .post(validateMW ,controller.addDayAPI)    
    .patch(validateMW ,controller.updateDay)
    .delete(validateMW ,controller.deleteDay);

router
    .route("/addContentToDay")
    .post(controller.addContentToDayAPI);

router
    .route("/contents/:id")
    .get(controller.getDayById);

module.exports = router;