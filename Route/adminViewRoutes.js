const express=require("express")
const router = express.Router();    
const validateMW = require("../Core/Validation/validateMW");
const adminViewsController = require("../Controller/adminViewsController");

const refresh = require("../Middleware/refresh")
const {requireAuth} = require("../Middleware/authenticationMW")

router
router.get('/adminStudents', adminViewsController.students);
router.get('/adminStudents/:phoneNumber'  ,adminViewsController.getOneStudent);
router.get('/adminCourses', adminViewsController.courses);
router.get('/adminCourses/:counter'  ,adminViewsController.getOneCourse);
router.post('/confirmCourseForStudent'  ,adminViewsController.confirmCourseForStudent);
router.post('/removeCourseFromStudent'  ,adminViewsController.removeCourseFromStudent);
// router.post('/unsubscribeCourseForStudent'  ,adminViewsController.getOneStudent);

    


module.exports = router;