const express = require('express');
const router = express.Router();
const User = require('../models/user');
const catchAsync = require("../utils/catchAsync");

router.get('/register', (req, res) => {
    res.render('users/register');
});

router.post('/register', catchAsync(async (req, res, next) => {
    try{
        const {email, username, password} = req.body;
        const user = new User({email, username});
        const registeredUser = await User.register(user, password);
        req.flash('success', 'Welcome to YelpCamp');
        res.redirect('/campgrounds');
    } catch(e) {
        req.flash('error', e.message);
        res.redirect('register');
    }
}));

router.get('/login', catchAsync(async (req, res, next) => {
    res.render('users/login');
}));

router.post('/login', catchAsync(async (req, res, next) => {

}));

module.exports = router;