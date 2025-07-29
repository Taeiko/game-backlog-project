const mongoose = require("mongoose")

// the backlog is for games 
const gameSchema = new mongoose.Schema({
    dateAdded: {
        type: Date
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
    statusComplete: {
        type: Boolean,
    }
})

// Model
const Game = mongoose.model("Game", gameSchema)

// export to use in other files
module.exports = Game