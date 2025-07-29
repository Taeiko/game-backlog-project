const express = require("express")
const app = express()
const dotenv = require('dotenv').config()
const methodOverride = require("method-override")
const connectToDB = require("./config/db")
const backlogRoutes = require('./routes/backlog.routes')
const morgan = require("morgan")


// middleware
app.use(express.static('public'))
app.use(express.urlencoded({extended: false}))
app.use(methodOverride("_method"))
app.use(morgan('dev'))

// database connection 
connectToDB()

// routes go here
app.use('/backlog', backlogRoutes)




const port = process.env.PORT || 3000
app.listen(port,()=>{
    console.log("port 3k active")
})