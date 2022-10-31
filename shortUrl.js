const mongoose = require('mongoose')
const shortId = require('shortid')

const shortUrlSchema = new mongoose.Schema({
    Origin:{
        type:String,
        required:true,
    },
    Compress:{
        type:String,
        required:true,
        default: shortId.generate
    },
    Uses:{
        type:Number,
        required:true,
        default: 0
    }

})

module.exports = mongoose.model('ShortUrl', shortUrlSchema)
