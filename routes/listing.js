const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isloggedin, isOwner, validateListing} = require("../middleware.js");

const listingController = require("../controllers/listings.js");
const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });

router.route("/")
.get(wrapAsync(listingController.index))
.post(isloggedin, upload.single("listing[image]"), validateListing, wrapAsync(listingController.createListing));

//New route
router.get("/new", isloggedin, listingController.renderNewForm);

router.route("/:id")
.get(wrapAsync(listingController.showListing))
.put(isloggedin, isOwner, upload.single("listing[image]"), validateListing, wrapAsync(listingController.updateListing))
.delete(isloggedin, isOwner, wrapAsync(listingController.destroyListing));
  
//Edit route
  router.get("/:id/edit",isloggedin, isOwner, wrapAsync(listingController.renderEditForm));

module.exports = router;