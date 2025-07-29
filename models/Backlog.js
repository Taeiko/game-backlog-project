const mongoose = require("mongoose")
const commentSchema = new mongoose.Schema({
    notes:{
        type: String
    }
})
// the backlog is for games 
const backlogSchema = new mongoose.Schema({
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
    statusComplete: {
        type: Boolean,
        default: false
    },
    comment:[commentSchema]
}, {timestamps:true})

// Model
const Backlog = mongoose.model("Backlog", backlogSchema)

// export to use in other files
module.exports = Backlog