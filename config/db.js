const mongoose = require("mongoose")
async function connectToDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("connected to database successfully")
    } catch (error) {
        console.log("error connecting to database", error)
    }
}

module.exports = connectToDB