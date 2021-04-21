var multer  = require('multer')
const path = require('path')
//const { types } = require('util')

const storage = multer.diskStorage({
    destination: (req , file , cb) => {
        cb(null, 'public/uploads')
    },
    filename: (req , file , cb) => {
        cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname)
    }
})


const upload =  multer({
    storage,
    limits:{
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: (req, file , cb) => {
        const types = /jpeg|jpg|png|gif/
        const extName = types.test(path.extname(file.originalname).toLowerCase())
        const mineType = types.test(file.mineType)
        
        if(extName && mineType){
            cb(null , true)
        }else {
            cb(new Error('Only Support Images'))
        }
    }
})

module.exports = upload