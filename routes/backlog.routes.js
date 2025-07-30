const Backlog = require("../models/Backlog")
const User = require("../models/User")
const router = require("express").Router()


// create a game listing - CREATE
router.get ("/new",async (req, res)=>{
    const allGames = await Backlog.find()
    res.render("backlogs/new.ejs", {allGames: allGames})
})

router.post('/', async (req,res)=>{
    try {
        console.log(req.body)
        if(req.body.status === "on"){
        req.body.status = true
    }
        await Backlog.create(req.body)
        res.redirect("/backlog")
    } catch (error) {
        console.log("failed to list new game", error)
    }
})

// shows the user their backlog - READ
router.get("/", async (req,res)=>{
    try {
        const userBacklog =  await Backlog.find()
        console.log(userBacklog)
        // here i tell the page to render my 
        res.render('backlogs/userbacklog.ejs', {userBacklog: userBacklog})
    } catch (error) {
        console.log("failed to fetch backlogs", error)
    }
})

//allows the user to edit their backlog - UPDATE
router.get('/edit/:backlogId' ,async (req,res)=>{
    try {
        const allGames = await Backlog.find()
        const foundGame = await Backlog.findById(req.params.backlogId)
        res.render('backlogs/update.ejs', {foundGame: foundGame, allGames: allGames})
    } catch (error) {
        console.log("failed to update game listing", error)
    }
})
router.put('/edit/:backlogId', async (req,res)=>{
    try {
        const allGames = await Backlog.find()
        const foundGame = await Backlog.findByIdAndUpdate(req.params.backlogId, req.body)
        res.redirect('/backlog')
    } catch (error) {
        console.log('failed to update game listing', error)
    }
})

// allows user to delete listings - DELETE
router.delete('/delete/:backlogId', async (req,res)=>{
    try {
        const foundGame = await Backlog.findByIdAndDelete(req.params.id)
        res.redirect('/backlog')
    } catch (error) {
        console.log('failed to delete game listing', error)
    }
})

// export router
module.exports = router