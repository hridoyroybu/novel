
const router = require('express').Router()
const {isAuthenticated} = require('../middleware/authMiddleWare')
const profileValidator = require('../validator/dashboard/profileValidator')

const dashboardController = require('../controllers/dashboardController')
router.get('/', isAuthenticated , dashboardController.dashboardGetController )

router.get('/create-profile' , isAuthenticated, dashboardController.createProfileGetController)
router.post('/create-profile' ,  isAuthenticated, profileValidator, dashboardController.createProfilePostController)

router.get('/edit-profile' , isAuthenticated, dashboardController.editProfileGetController)
router.post('/edit-profile' , isAuthenticated, profileValidator,dashboardController.editProfilePostController )

module.exports = router

