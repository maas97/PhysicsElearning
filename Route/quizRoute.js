const express=require("express")
const router = express.Router();    
// const studentValidation = require("../Core/Validation/contentValidation");
const validateMW = require("../Core/Validation/validateMW");
const controller = require("../Controller/quizController");

router
    .route("/quizzes")
    // .all(authorization.checkRoot)
    .get(controller.getAllQuizzes)
    .post(validateMW ,controller.addQuiz)
    .patch(validateMW ,controller.updateQuiz)
    // upload("basicAdmin"),
    .delete(validateMW ,controller.deleteQuiz);

router
    .route("/contents/:id")
    .get(controller.getQuizById);

module.exports = router;