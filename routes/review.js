const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const expressError = require("../utils/expressError.js");
const {validateReview, isloggedin, isReviewAuthor} = require("../middleware.js");

const reviewController = require("../controllers/reviews.js");


//Post review Route
  router.post("/", isloggedin, validateReview, wrapAsync(reviewController.createReview));
  
//Delete review Route
  router.delete("/:reviewId", isloggedin, isReviewAuthor, wrapAsync(reviewController.destroyReview));

  module.exports = router;