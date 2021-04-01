const bcrypt = require('bcrypt')
const { json } = require('express')
const {validationResult, body} = require('express-validator')
const User = require('../models/User')
const Flash = require('../utils/Flash')

const errorFormater = require('../utils/validationErrorFormatter')

exports.signupGetController = (req, res, next) => {
    res.render('pages/auth/signup' , {title: 'Create A New Account', error:{} , value:{} , flashMessage:Flash.getMessage(req)})
}
exports.signupPostController = (req, res, next) => {

    let errors = validationResult(req).formatWith(errorFormater)

    
    if(!errors.isEmpty()){
        req.flash('fail' , 'Please Check Your Form')
        return res.render('pages/auth/signup' , {
            title: 'Create A New Account' , 
            error: errors.mapped(),
            value: req.body,
            flashMessage:Flash.getMessage(req)
        })
    }

    bcrypt.hash(req.body.password, 10, function(err, hash) {
        if(err){
            console.log(err)
        }
        let user = new User({
            username : req.body.username, 
            email : req.body.email, 
            password : hash
        })
        user.save()
        
        .then(result => {
            req.flash('success' , 'Successfully create new account') 
            res.render('pages/auth/login' , {title: 'Create A New Account', error:{} , value:{}, flashMessage:Flash.getMessage(req)})
        })
        .catch(err => {
            console.log(err)
        })
    });
}

exports.loginGetController = (req, res, next) => {
    res.render('pages/auth/login', {title:'Login To Your Account' , error:{} , value:{}, flashMessage:Flash.getMessage(req)})
    
}
exports.loginPostController = async (req, res, next) => {
    
    let errors = validationResult(req).formatWith(errorFormater)
    let {email , password} = req.body

    try{

        let errors = validationResult(req).formatWith(errorFormater)

        if(!errors.isEmpty()){
            return res.render('pages/auth/login' , {
                title: 'Create A New Account' , 
                error: errors.mapped(),
                value: req.body,
                flashMessage:Flash.getMessage(req)
            })
        }
        req.session.isLoggedIn = true
        req.session.user = req.body
        req.session.save(err => {
            if(err){
                console.log(err)
                return next(err)
            }
            req.flash('success' , 'Successfully LoggedIn')
            return res.redirect('/dashboard')
        })
        
    }catch(e){
        console.log(e)
        next(e);
    }
}

exports.logoutController = (req, res, next) => {
    req.session.destroy(err => {
        if(err){
            console.log(err)
            return next(err)
        }
        //req.flash('success' , 'Successfully Logout')
        return res.redirect('/auth/login')
        
    })
}