const express = require("express");
const router = express.Router()
const Search = require('../models/Search.js')

router.get('/',async(req,res) => {
    try{
    const searches = await Search.find().sort({createdAt : -1})
    res.json({success : true, data : searches})
    } catch(err){
        res.status(500).json({error : err.message})
    }

})

router.delete('/:id', async (req, res) => {
    try {
        await Search.findByIdAndDelete(req.params.id)
        res.json({ success: true, message: 'Deleted successfully' })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

module.exports = router