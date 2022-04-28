const express = require('express');

const PORT = 3000;
const path = require('path');
const Campground = require('./models/campground');
const mongoose = require("mongoose");

mongoose.connect('mongodb+srv://chadczilli:chadczilli@cluster0.qp2n1.mongodb.net/yelpCamp?retryWrites=true&w=majority');

const db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error:"));
db.once('open', () => {
    console.log("Database Connected...");
});

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({extended: true}));


app.get('/', (req, res) => {
    res.send('working.');
});

app.get('/campgrounds', async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', {campgrounds});
});

app.post('/campgrounds', async (req, res) => {
    const campground = new Campground(req.body.campground);
    campground.save();
    res.redirect(`/campgrounds/${campground._id}`);
});

app.get('/campgrounds/new', (req, res) => {
    res.render('campgrounds/new');
});

app.get('/campgrounds/:id', async (req, res) => {
    const {id} = req.params;
    const campground = await Campground.findById(id);
    res.render('campgrounds/show', {campground})
});

app.get

app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
});