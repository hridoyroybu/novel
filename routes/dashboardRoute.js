
const router = require('express').Router()
const {isAuthenticated} = require('../middleware/authMiddleWare')
const dashboardController = require('../controllers/dashboardController')
router.get('/', isAuthenticated , dashboardController.dashboardGetController )

module.exports = router