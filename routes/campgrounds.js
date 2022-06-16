const express = require('express');
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const {isLoggedIn, isAuthor, validateCampground} = require('../middleware');
const campgrounds = require("../controllers/campgrouinds");
const multer = require('multer');
const {storage} = require('../cloudinary');
const upload = multer({storage});

router.route('/')
    .get(catchAsync(campgrounds.index))
    // .post(isLoggedIn, validateCampground, catchAsync(campgrounds.createNewCampground));
    .post(upload.array('image'), async (req, res) => {
        console.log(req.body, req.files);
        res.send("IT WORKED!!");
    })

router.get('/new', isLoggedIn, campgrounds.renderNewForm);

router.route('/:id')
    .get(catchAsync(campgrounds.showCampground))
    .put(isLoggedIn, isAuthor, validateCampground, catchAsync(campgrounds.edit))
    .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.delete));


// Edit Form
router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.showEditForm));


module.exports = router;