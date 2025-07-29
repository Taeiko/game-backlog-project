const express = require("express")
const app = express()
const dotenv = require('dotenv').config()
const methodOverride = require("method-override")
const connectToDB = require("./config/db")
const backlogRoutes = require('./routes/backlog.routes')
const authRoutes = require('./routes/auth.routes')
const morgan = require("morgan")
const session = require("express-session")
const passUserToView = require('./middleware/passUserToView')
const isSignedIn = require("./middleware/isSignedIn")

// middleware
app.use(express.static('public'))
app.use(express.urlencoded({extended: false}))
app.use(methodOverride("_method"))
app.use(morgan('dev'))
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passUserToView)
// database connection 
connectToDB()

// routes go here
app.use('/backlog', backlogRoutes)
app.use('/auth', authRoutes )



const port = process.env.PORT || 3000
app.listen(port,()=>{
    console.log("port 3k active")
})