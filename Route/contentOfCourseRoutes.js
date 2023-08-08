const express=require("express")
const router = express.Router();    
// const studentValidation = require("../Core/Validation/contentValidation");
const validateMW = require("../Core/Validation/validateMW");
const controller = require("../Controller/contentOfCourseController");

router
    .route("/contents")
    // .all(authorization.checkRoot)
    .get(controller.getAllContent)
    .post(validateMW ,controller.addContent)
    .patch(validateMW ,controller.updateContent)
    .delete(validateMW ,controller.deleteContent);

router
    .route("/contents/:id")
    .get(controller.getContentById);

module.exports = router;