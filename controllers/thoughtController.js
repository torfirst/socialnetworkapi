const { Thought, User } = require("../models")


module.exports = {
    async findAllThoughts(req, res) {
        try {
            const thoughts = await Thought.find()
            res.json(thoughts)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    },

    async createThought(req, res) {
        try {
            const thought = await Thought.create({
                thoughtText: req.body.thoughtText,
                username: req.body.username
            })
            const user = await User.updateOne({
                _id: req.body.userId,
            }, {
                $push: { thoughts: thought._id }
            }, {
                new: true
            })
            res.json({thought, user})
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    },

    async findThought(req, res) {
        try {
            const thought = await Thought.findById({
                _id: req.params.thoughtId
            })
            res.json(thought)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    },

    async updateThought(req, res) {
        try {
            const updatedThought = await Thought.updateOne({
                _id: req.params.thoughtId,
            }, {
                $set: {
                    thoughtText: req.body.thoughtText,
                    username: req.body.username
                }
            })
            res.json(updatedThought)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }

    },

    async deleteThought(req, res) {
        try {
            const thought = await Thought.deleteOne({
                _id: req.params.thoughtId
            })
            res.json(thought)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    },

    async addReaction(req, res) {
        try {
            if (req.body.reactionBody.length > 280) {
                res.status(500).json("Reaction body too long. Max length is 280 characters.")
            }
            const reaction = await Thought.updateOne({
                _id: req.params.thoughtId
            }, {
                $push: {
                    reactions: {
                        username: req.body.username,
                        reactionBody: req.body.reactionBody
                    }
                }
            })
            res.json(reaction)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    },

    async deleteReaction(req, res) {
        try {
            const reaction = await Thought.updateOne({
                _id: req.params.thoughtId
            }, {
                $pull: {
                    reactions: {
                       reactionId: req.body.reactionId
                    }
                }
            })
            res.json(reaction)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    }


}