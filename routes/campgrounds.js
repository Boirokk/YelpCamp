const express = require('express');
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const {isLoggedIn, isAuthor, validateCampground} = require('../middleware');
const campgrounds = require("../controllers/campgrouinds");

router.route('/')
    .get(catchAsync(campgrounds.index))
    .post(isLoggedIn, validateCampground, catchAsync(campgrounds.createNewCampground));

router.get('/new', isLoggedIn, campgrounds.renderNewForm);

router.route('/:id')
    .get(catchAsync(campgrounds.showCampground))
    .put(isLoggedIn, isAuthor, validateCampground, catchAsync(campgrounds.edit))
    .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.delete));


// Edit Form
router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.showEditForm));


module.exports = router;