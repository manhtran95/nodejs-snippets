const { render } = require('ejs')
const express = require('express')
const mongoose = require('mongoose')
const ejsMate = require('ejs-mate')
const path = require('path')
const methodOverride = require('method-override')
const Campground = require('./models/campground')
const Product = require('../32_Mongoose_Express/models/product')

mongoose.connect('mongodb://localhost:27017/yelp-camp')

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("Database connected")
});

const app = express()

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true}))
app.use(methodOverride('_method'))

// CREATE
app.post('/campgrounds', async (req, res) => {
    console.log(req.body)
    const campground = new Campground(req.body.campground)
    await campground.save()
    res.redirect(`/campgrounds/${campground._id}`)
})
// NEW
app.get('/campgrounds/new', (req, res) => {
    res.render('campgrounds/new')
})

// GET ALL
app.get('/campgrounds', async (req, res) => {
    const campgrounds = await Campground.find({})
    res.render('campgrounds/index', { campgrounds })
})
// GET ONE
app.get('/campgrounds/:id', async (req, res) => {
    const { id } = req.params
    const campground = await Campground.findById(id)
    res.render('campgrounds/show', { campground })
})

// EDIT
app.get('/campgrounds/:id/edit', async (req, res) => {
    const { id } = req.params
    console.log(id)
    const campground = await Campground.findById(id)
    console.log(campground.title)
    res.render('campgrounds/edit', { campground })
})
// PATCH
app.patch('/campgrounds/:id', async (req, res) => {
    const { id } = req.params
    const campgroundBody = req.body.campground
    const campground = await Campground.findByIdAndUpdate(id, campgroundBody, {runValidators: true, new: true})
    res.redirect(`/campgrounds/${campground._id}`)
})

// DELETE
app.delete('/campgrounds/:id', async (req, res) => {
    const { id } = req.params
    await Campground.findByIdAndDelete(id)
    res.redirect('/campgrounds')
})

app.listen(3000, () => {
    console.log('Serving on port 3000')
})