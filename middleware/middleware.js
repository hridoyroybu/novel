
const express = require('express')
const morgan = require('morgan')
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session);
const flash = require('connect-flash');

const {bindUserWithRequest} = require('./authMiddleWare')
const setLocals = require('./setLocals')

const MONGDB_URI = 'mongodb+srv://hridoyroy:pass@cluster0.p5olu.mongodb.net/novel-db?retryWrites=true&w=majority'

const store = new MongoDBStore({
    uri: MONGDB_URI,
    collection: 'mySessions',
    expires: 1000*60*60*6
});


const middleware = [
    morgan('dev'),
    express.static('public'),
    express.urlencoded({extended: true}),
    express.json(),
    session({
        secret: process.env.SECRET_KEY || 'SECRET_KEY',
        resave: false,
        saveUninitialized: false,
        store: store,

    }),
    flash(),
    bindUserWithRequest(),
    setLocals()
]

module.exports = app => {
    middleware.forEach(m => {
        app.use(m)
    })
}
