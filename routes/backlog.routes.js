const Backlog = require("../models/Backlog")
const router = require("express").Router()


// create a game listing 
router.get ("/new",async (req, res)=>{
    const allGames = await Backlog.find()
    res.render("backlogs/new.ejs", {allGames: allGames})
})

router.post('/', async (req,res)=>{
    try {
        console.log(req.body)
        await Backlog.create(req.body)
        res.redirect("backlog")
    } catch (error) {
        comsole.log("failed to list new game", error)
    }
})

// show backlogs
router.get("/backlog", (req,res)=>{
    try {
        const allGames = Backlog.find()
        res.render('backlog/all-backlogs.ejs')
    } catch (error) {
        console.log("failed to fetch backlogs", error)
    }
})


// export router
module.exports = router