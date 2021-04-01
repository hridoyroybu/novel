const router = require('express').Router()
const {isUserLoggedIn} = require('../middleware/authMiddleWare')

const signupValidator = require('../validator/auth/signupValidator')
const loginValidator = require('../validator/auth/loginValidator')

const authController = require('../controllers/authController')



router.get('/signup' , isUserLoggedIn,authController.signupGetController)
router.post('/signup',signupValidator,authController.signupPostController)


router.get('/login',isUserLoggedIn,authController.loginGetController)
router.post('/login',loginValidator, authController.loginPostController)

router.get('/logout',authController.logoutController)

module.exports = router