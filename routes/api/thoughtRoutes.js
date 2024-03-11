const { findAllThoughts, createThought, findThought, updateThought, deleteThought, addReaction, deleteReaction } = require('../../controllers/thoughtController');

const router = require('express').Router();

router.route("/").get(findAllThoughts).post(createThought)

router.route("/:thoughtId").get(findThought).put(updateThought).delete(deleteThought)

router.route("/:thoughtId/reactions").post(addReaction).delete(deleteReaction)

module.exports = router;