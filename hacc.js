const express = require('express')
const mongoose = require('mongoose')
const ShortUrl = require('./models/shortUrl')
const app = express()
app.use(express.static(__dirname + '/public'));
app.use('/local-files', express.static('/'));
mongoose.connect('mongodb://localhost/HACC', {
    useNewUrlParser: true, useUnifiedTopology: true
})


app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false}))

app.get('/', async (req,res) =>{
    const shortUrls = await ShortUrl.find()
    res.render('index', { shortUrls: shortUrls})
})
app.post('/shortUrls', async (req, res) =>{
    await ShortUrl.create({ Origin: req.body.OriginUrl})
    res.redirect('/')
})
app.get('/:shortUrl', async (req, res) =>{
    const shortUrl = await ShortUrl.findOne({Compress: req.params.shortUrl})
    if(shortUrl == null) return res.sendStatus(404)

    shortUrl.Uses++
    shortUrl.save()

    res.redirect(shortUrl.Origin)
})
app.listen(process.env.PORT || 3000);