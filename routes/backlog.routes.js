const Backlog = require("../models/Backlog")
const User = require("../models/User")
const router = require("express").Router()
const isSignedIn = require('../middleware/isSignedIn')


// create a game listing - CREATE
router.get("/new", async (req, res) => {
    console.log(req.session.user)
    try { const allBacklogs = await Backlog.find()
    res.render("backlogs/new.ejs", { allBacklogs: allBacklogs })
    } catch (error){
        console.log("failed to create game", error)
    }
})

router.post('/', async (req, res) => {
    try {
        console.log(req.session.user)
        req.body.user = req.session.user._id

        console.log(req.body)

        await Backlog.create(req.body)
        res.redirect("/backlog")
    } catch (error) {
        console.log("failed to list new game", error)
    }
})




// shows the user their backlog - READ
router.get("/", async (req, res) => {
    try {
        const userBacklog = await Backlog.find({ user: req.session.user._id })
        console.log(userBacklog)
        // here i tell the page to render my 
        res.render('backlogs/userbacklog.ejs', { userBacklog: userBacklog })
    } catch (error) {
        console.log("failed to fetch backlogs", error)
    }
})
// shows the user the game via id 
router.get('/details/:backlogId', async (req, res) => {
    try {
        const foundGame = await Backlog.findById(req.params.backlogId)
        res.render('backlogs/game-details.ejs', { foundGame })
        console.log(foundGame)
    } catch (error) {
        console.log("failed to find game", error)
    }
})


// shows the user backlogs of other users 
// community page
router.get('/users', async(req,res)=>{
    try{ 
        const allUsers = await User.find().populate("backlog")
        res.render('backlogs/community.ejs', {allUsers: allUsers})
        console.log(allUsers)
    } catch (error) {
        console.log("failed to fetch community backlogs", error)
    }
})
// user backlog
router.get('/users/:userId', async(req,res)=>{
    try{ 
        const foundUser = await User.findById(req.params.userId)
        if(foundUser) {
            const allUserBacklogs = await Backlog.find({user:foundUser._id})
            res.render('backlogs/userDetail.ejs', {foundUser , allUserBacklogs})
        }
        console.log(foundUser)
    } catch (error) {
        console.log("failed to fetch community backlogs", error)
    }
})




//allows the user to edit their backlog - UPDATE
router.get('/edit/:backlogId', async (req, res) => {
    try {
        const allGames = await Backlog.find()
        const foundGame = await Backlog.findById(req.params.backlogId)
        res.render('backlogs/update.ejs', { foundGame: foundGame, allGames: allGames })
    } catch (error) {
        console.log("failed to update game listing", error)
    }
})

router.put('/edit/:backlogId', async (req, res) => {
    try {
        let foundGame = Backlog.findById(req.params.backlogId)
        // json stringify converts object id into strings
        if (req.session.user._id === JSON.stringify(foundGame.user)) {
            return res.send('Error! this listing belongs to another user.')
        }
        const allGames = await Backlog.find()
        foundGame = await Backlog.findByIdAndUpdate(req.params.backlogId, req.body)

        res.redirect('/backlog')
    } catch (error) {
        console.log('failed to update game listing', error)
    }
})



// allows user to delete listings - DELETE
router.delete('/:backlogId', async (req, res) => {
    try {
        let foundGame = await Backlog.findById(req.params.backlogId)
        console.log("Session Id " + req.session.user._id)
        console.log("found game id ", foundGame.user)
        if (req.session.user._id === JSON.stringify(foundGame.user)) {
            return res.send('Error! this listing belongs to another user.')
        }
        foundGame = await Backlog.findByIdAndDelete(req.params.backlogId)
        res.redirect('/backlog')
    } catch (error) {
        console.log('failed to delete game listing', error)
    }
})

// export router
module.exports = router