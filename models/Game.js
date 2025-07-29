const mongoose = require("mongoose")

// this is to post comments on the game
const commentSchema = new mongoose.Schema({
    notes:{
        type: String
    }
})
// the backlog is for games 
const gameSchema = new mongoose.Schema({
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
    }
}, {timestamps:true})

// Model
const Game = mongoose.model("Game", gameSchema)

// export to use in other files
module.exports = Game