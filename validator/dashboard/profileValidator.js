const { body } = require('express-validator')
const validator = require('validator')

const urlValidator = value => {
    if(value){
        if(!validator.isURL(value)){
            throw new Error('Please provide valid url')
        }
    }
    return true
}

module.exports = [
    body('name')
        .not().isEmpty().withMessage('Name can not be empty')
        .isLength({max:30}).withMessage('Name can not be more than 50 chars')
    ,
    body('title')
        .not().isEmpty().withMessage('Title can not be empty')
        .isLength({max:100}).withMessage('Title can not be more than 100 chars')
    ,
    body('bio')
        .not().isEmpty().withMessage('Bio can not be empty')
        .isLength({max:500}).withMessage('Bio can not be more than 500 chars')
    ,
    body('website')
        .custom(urlValidator)
        //.isURL().withMessage('Please provide valid url')
    ,
    body('facebook')
        .custom(urlValidator)
        //.isURL().withMessage('Please provide valid url')
    ,
    body('linkedin')
        .custom(urlValidator)
        //.isURL().withMessage('Please provide valid url')

]