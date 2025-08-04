const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true, "username is required." ],
        unique: [true, "username is already in use."]
    },
    password:{
        type:String,
        required:[true, "password is required"]
    },
    backlog: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Backlog"
    }
})

const User = mongoose.model("User",userSchema)

module.exports = User