// project for necessary file including area
const path = require('path')
const express = require('express')
const fileUpload = require('express-fileupload')
const {engine} = require('express-handlebars')
const dotenv = require('dotenv')
const expressSession = require('express-session')
const conn = require(path.join(__dirname, 'conn.js'))

//Db connection
conn()

// Default variablas and arrys setting area
const app = express()
dotenv.config()
let time = 1000 * 60 * 30



// Session use
app.use(expressSession({
    secret: 'Deneme',
    resave: false,
    saveUninitialized: true,
    cookie: { path: '/', _expires: time, originalMaxAge: time, httpOnly: false }
}))


app.use((req, res, next) => {
   const {adminID} = req.session
   if (adminID) {
      res.locals.adminLink = true
   }
   else{
      res.locals.adminLink = false
   }
   next()
})





// Starting Middleware Setting Area
app.use(express.static(path.join(__dirname, 'public')))
app.use(fileUpload())


// Template Engine Setting Area
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', path.join(__dirname, 'views'))


// Router Datas İncluding Area
const MainRouter = require(path.join(__dirname, 'router', 'MainRouter.js'))
const LoginRouter = require(path.join(__dirname, 'router', 'LoginRouter.js'))
const LogoutRouter = require(path.join(__dirname, 'router', 'LogoutRouter.js'))
const ContentRouter = require(path.join(__dirname, 'router', 'ContentRouter.js'))


// Router from Used Middleware Area
app.use('/', MainRouter)
app.use('/login', LoginRouter)
app.use('/logout', LogoutRouter)
app.use('/content', ContentRouter)



// Server from Port Listening Area
app.listen(process.env.PORT, ()=>{
   console.log(`Server is running http://127.0.0.1:${process.env.PORT}/`)
})