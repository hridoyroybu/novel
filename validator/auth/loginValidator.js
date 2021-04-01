const { body } = require('express-validator')
const bcrypt = require('bcrypt')
const User = require('../../models/User')
let CurPass;

module.exports = [
    body('email')
        .isEmail().withMessage('Provide valid Email')
        .normalizeEmail()
        .custom(async email => {
            let user = await User.findOne({email})
            if(!user){
                return Promise.reject('Email does not exist')
            }
            CurPass = user.password
        })
    ,
    body('password')
        .not().isEmpty().withMessage('Password Can not be empty')
        .custom(async password => {
            let match = await bcrypt.compare(password , CurPass)
            if(!match){
                return Promise.reject('Password does not match')
            }
        }) 
]