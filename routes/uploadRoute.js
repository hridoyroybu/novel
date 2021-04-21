const router = require('express').Router()

const {isAuthenticated} = require('../middleware/authMiddleWare')
const upload = require('../middleware/uploardMiddleware')

const uploadProfilePicsController= require('../controllers/uploadController')

router.post('/profilePics' ,isAuthenticated  , upload.single('profilePics'), 
uploadProfilePicsController.uploadProfilePics 
 )

module.exports = router