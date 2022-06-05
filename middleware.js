const {campgroundSchema, reviewSchema} = require("./schemas");
const ExpressError = require("./utils/ExpressError");
const Campground = require("./models/campground");


// Middleware to check to see if user is logged in
module.exports.isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()) {
        // store the url they are requesting
        req.session.returnTo = req.originalUrl;
        req.flash('error', 'You must be signed in first!');
        return  res.redirect('/login');
    }
    next();
}

// Middleware to validate campground before talking with DB
module.exports.validateCampground = (req, res, next) => {
    const {error} = campgroundSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
};

// Middleware to make sure you can't edit anything that you are not authed to
module.exports.isAuthor = async (req, res, next) => {
    const {id}= req.params;
    const campground = await Campground.findById(id);
    if(!campground.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that.');
        return res.redirect(`/campgrounds/${id}`)
    }
    next();
};

// Middleware to validate campground before talking with DB
module.exports.validateReview = (req, res, next) => {
    const {error} = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
}