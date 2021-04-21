const { render } = require('ejs')
const express = require('express')
const mongoose = require('mongoose')

const app = express()

const setMiddleare = require('./middleware/middleware')
const setRoutes = require('./routes/routes')


const MONGDB_URI = 'mongodb+srv://hridoyroy:pass@cluster0.p5olu.mongodb.net/novel-db?retryWrites=true&w=majority'

// Setup View Engine
app.set('view engine' , 'ejs')
app.set('views' , 'views')

// using middleware from middleware directory
setMiddleare(app)

// using routes from route directory
setRoutes(app)


app.use((req, res, next) => {
    let error = new Error('404 Not Found')
    error.status = 404
    next(error)
})

app.use((error , req, res , next) => {
    if(error.status === 404){
        return res.render('pages/Error/404', {flashMessage:{}})
    }
    res.render('pages/Error/500', {flashMessage:{}})
})

const PORT = process.env.PORT || 8800
mongoose.connect(MONGDB_URI,{useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log("Database Connected")
    app.listen(PORT, () => {
                        console.log(`Server is running on PORT ${PORT}` )
                    }) 
})
.catch(e => {
    console.log(e)
})
