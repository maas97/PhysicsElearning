const { Router } = require('express');
const viewsController = require('../Controller/viewsController');
const {requireAuth} = require("../Middleware/authenticationMW")
const router = Router();

router.get('/', viewsController.home);
router.get('/myCoursesInfo', requireAuth  ,viewsController.coursesInfo);
router.get('/myCoursesInfo/:counter', requireAuth  ,viewsController.getOneCoursedetails);
router.get('/myCoursesInfo/:counter/subscribed', requireAuth  ,viewsController.subscribed);
router.get('/myCoursesInfo/:counter/courseList', requireAuth  ,viewsController.courseList);
router.get('/freeExams'  ,viewsController.freeExams);
router.get('/profile', requireAuth  ,viewsController.profile);

module.exports = router;