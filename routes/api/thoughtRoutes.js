const { findAllThoughts, createThought } = require('../../controllers/thoughtController');

const router = require('express').Router();


router.route("/").get(findAllThoughts).post(createThought)

// router.route()

module.exports = router;