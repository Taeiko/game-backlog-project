const express = require("express")
const app = express()
const dotenv = require('dotenv').config()
const methodOverride = require("method-override")
const connectToDB = require("./config/db")


// middleware
app.use(express.static('public'))
app.use(express.urlencoded({extended: false}))
app.use("_method")
app.use('dev')

// database connection 
connectToDB()

app.listen(prototype,()=>{
    console.log("port 3k active")
})