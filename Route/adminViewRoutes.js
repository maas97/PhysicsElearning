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
router.get('/adminCourses/addNewCourse'  ,adminViewsController.pageOfAddingNewCourse);
router.get('/adminCourses/:counter'  ,adminViewsController.getOneCourse);
router.get('/adminCourses/:counter/addNewDayToCourse/addNewContentToDay/:_id' , adminViewsController.pageOfAddingNewContentToDay)
router.get('/adminCourses/:counter/addNewDayToCourse/:lastDay'  ,adminViewsController.pageOfAddingNewDayToCourse);
router.get('/adminProducts', adminViewsController.products);
router.get('/adminProducts/addNewProduct', adminViewsController.addNewProducts);
router.get('/adminProducts/showProducts', adminViewsController.showProducts);
router.post('/adminProducts/delivered', adminViewsController.productDelivered);
router.post('/confirmCourseForStudent'  ,adminViewsController.confirmCourseForStudent);
router.post('/removeCourseFromStudent'  ,adminViewsController.removeCourseFromStudent);
router.post('/addDay' , adminViewsController.addDayFrontend)
router.post('/addContentToDay' , adminViewsController.addContentToDayFrontend)


// router.post('/unsubscribeCourseForStudent'  ,adminViewsController.getOneStudent);

    


module.exports = router;