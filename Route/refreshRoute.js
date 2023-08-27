const { Router } = require('express');
const refresh = require("../Middleware/refresh")
const router = Router();


router.get('/refresh', refresh);

module.exports = router;
