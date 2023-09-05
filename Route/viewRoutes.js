const { Router } = require('express');
const viewsController = require('../Controller/viewsController');
const refresh = require("../Middleware/refresh")
const {requireAuth} = require("../Middleware/authenticationMW")
const router = Router();


router.get('/', viewsController.home);
router.get('/refresh', refresh);
router.get('/myCoursesInfo' , viewsController.coursesInfo);
router.get('/myCoursesInfo/:counter', requireAuth  ,viewsController.getOneCoursedetails);
router.get('/myCoursesInfo/:counter/subscribed', requireAuth  , viewsController.requestCourse);
router.get('/myCoursesInfo/:counter/courseList', requireAuth  , viewsController.courseList);
router.get('/freeExams'  , viewsController.freeExams);
router.get('/profile', requireAuth  , viewsController.profile);
router.get('/myProductsInfo'  , viewsController.products);
router.get('/myProductsInfo/:counter'  ,viewsController.getOneProductDetails);



module.exports = router;