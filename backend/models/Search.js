const mongoose = require("mongoose")

const searchSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    translations: {
        type : Object
    },
    
    
}, {timestamps : true})

// const Search = mongoose.model('Search',searchSchema)
module.exports = mongoose.model('Search', searchSchema)
