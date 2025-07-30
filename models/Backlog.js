const mongoose = require("mongoose")
const commentSchema = new mongoose.Schema({
    notes:{
        type: String
    }
})
// the backlog is for games 
const backlogSchema = new mongoose.Schema({
    // i want the backlog to be exclusive to each user
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    game: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
    },
    description: {
        type: String
    },
    status: {
        type: Boolean,
        default: false
    },
    comment:[commentSchema]
}, {timestamps:true})

// Model
const Backlog = mongoose.model("Backlog", backlogSchema)

// export to use in other files
module.exports = Backlog


/* 
1. change the backlog model and add a user field that references the User by the id - done
2. change the post route for creating a backlog and have it add the req.session.user._id to the req.body
3. change the update and delete to check if the user is allowed to edit the backlog only if it is theirs
*/