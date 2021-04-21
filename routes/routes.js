
const authRoute = require('./authRoute')
const dashbboardRoute = require('./dashboardRoute')
const uploadRoute = require('./uploadRoute')

const routes = [
    {
        path:'/auth',
        handler: authRoute
    },
    {
        path:'/dashboard',
        handler: dashbboardRoute
    },
    {
        path:'/uploads',
        handler: uploadRoute
    },
    {
        path:'/',
        handler: (req , res) => {
            res.json({
                message: 'Hello World'
            })
        }
    }
]

module.exports = app => {
    routes.forEach(r => {
        if(r.path === '/')
            app.get(r.path , r.handler)
        else
            app.use(r.path, r.handler)
    })
}