const {validationResult} = require('express-validator')
const Flash = require('../utils/Flash')
const  Profile = require('../models/Profile')
const  User = require('../models/User')
const errorFormatter = require('../utils/validationErrorFormatter')

exports.dashboardGetController = async(req, res, next) => {
    
    try{
        let profile = await Profile.findOne({user: req.user._id})
        if(profile){
            return res.render('pages/dashboard/dashboard', {title:'My dashboard' , flashMessage:Flash.getMessage(req)})
        }
        res.redirect('/dashboard/create-profile')
    }catch(e){
        next(e)
    }    
}


exports.createProfileGetController = async (req, res, next) => {
    try{
        let profile = await Profile.findOne({user: req.user._id})
        if(profile){
            return res.redirect('/dashboard/edit-profile')
        }
        res.render('pages/dashboard/create-profile', {title:'Create Your Profile' , flashMessage:Flash.getMessage(req),error:{}})
    }catch(e){
        next(e)
    }
}

exports.createProfilePostController = async (req, res, next) => {
    
    let errors = validationResult(req).formatWith(errorFormatter)
    if(!errors.isEmpty()){
        return  res.render('pages/dashboard/create-profile', 
            {title:'Create Your Profile' , 
            flashMessage:Flash.getMessage(req),
            error:errors.mapped()
        })
    }
    let {
        name,
        title,
        bio,
        website,
        facebook,
        linkedin

    } = req.body

    try{
        let profile = new Profile({
            user : req.user._id,
            name,
            title,
            bio,
            profilePic: req.user.profilePics,
            links:{
                website : website || '',
                facebook : facebook || '',
                linkedin : linkedin || ''
            }
            ,
            posts: [],
            bookmarks: []
        })
        let createdProfile = await profile.save()
        await User.findOneAndUpdate(
            {_id: req.user._id},
            {$set: {profile: createdProfile._id}}
        )
        req.flash('success' , 'Successfully Created Profile')
        res.redirect('/dashboard')

    }catch(e){
        next(e);
    }

}

exports.editProfileGetController = async (req, res, next) => {
    try {
        let profile = await Profile.findOne({user: req.user._id})
        if(!profile){
            return redirect('dashboard/create-profile')
        }
        res.render('pages/dashboard/edit-profile', 
            {title:'Edit Your Profile' , 
            flashMessage:Flash.getMessage(req),
            error:{},
            profile
        })

    }catch(e){
        next(e)
    }
}

exports.editProfilePostController = async(req, res, next) => {
    let {
        name,
        title,
        bio,
        website,
        facebook,
        linkedin

    } = req.body

    let errors = validationResult(req).formatWith(errorFormatter)

    if(!errors.isEmpty()){
        return  res.render('pages/dashboard/edit-profile', {
            title:'Edit Your Profile' , 
            flashMessage:Flash.getMessage(req),
            error:errors.mapped(),
            profile: {
                name,
                title,
                bio,
                links: {
                    website,
                    facebook,
                    linkedin
                }
            }
        })
    }
    
    try{
        let profile = {
            name,
            title,
            bio,
            links:{
                website : website || '',
                facebook : facebook || '',
                linkedin : linkedin || ''
            }
        }

        let updateProfile =  await Profile.findOneAndUpdate(
            {user: req.user._id},
            {$set: profile},
            {new : true}
        )
        req.flash('success' , 'Successfully Updated Profile')
        res.render('pages/dashboard/edit-profile', 
            {title:'Edit Your Profile' , 
            flashMessage:Flash.getMessage(req),
            error:{},
            profile : updateProfile
        })
   

    }catch(e){
        console.log(e)
        next(e);
    }


}

