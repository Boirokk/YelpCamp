const express = require('express');
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const {isLoggedIn, isAuthor, validateCampground} = require('../middleware');
const campgrounds = require("../controllers/campgrouinds");

router.get('/', catchAsync(campgrounds.index));

router.get('/new', isLoggedIn, campgrounds.renderNewForm);

router.post('/', isLoggedIn, validateCampground, catchAsync(campgrounds.createNewCampground));

// Show Page
router.get('/:id', catchAsync(campgrounds.showCampground));

// Edit Form
router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.showEditForm));

router.put('/:id', isLoggedIn, isAuthor, validateCampground, catchAsync(campgrounds.edit));

router.delete('/:id', isLoggedIn, isAuthor, catchAsync());

module.exports = router;