const { Thought, User } = require("../models")


module.exports = {
    async findAllUsers(req, res) {
        try {
            const users = await User.find().populate("thoughts friends").exec()
            res.json(users)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    },

    async createUser(req, res) {
        try {
            const user = await User.create(req.body)
            res.json(user)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    },

    async findUser(req, res) {
        try {
            const user = await User.findById({
                _id: req.params.userId
            }).populate("thoughts friends").exec()
            res.json(user)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    },

    async updateUser(req, res) {
        try {
            const updatedUser = await User.updateOne({
                _id: req.params.userId,
            }, {
                $set: {
                    email: req.body.email,
                    username: req.body.username
                }
            })
            res.json(updatedUser)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }

    },

    async deleteUser(req, res) {
        try {
            const user = await User.findById({
                _id: req.params.userId
            })
            const thoughts = await Thought.deleteMany({
                $or: [{
                    username: user?.username
                }, {
                    _id: {$in: user?.thoughts}
                }]
            })
            const deletedUser = await User.deleteOne({
                _id: req.params.userId
            })
            res.json({thoughts, deletedUser})
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    },

    async addFriend(req, res) {
        try {
            const user = await User.updateOne({
                _id: req.params.userId
            }, {
                $push: {
                    friends: req.params.friendId
                }
            })
            res.json(user)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    },    
    
    async deleteFriend(req, res) {
        try {
            const user = await User.updateOne({
                _id: req.params.userId
            }, {
                $pull: {
                    friends: req.params.friendId
                }
            })
            res.json(user)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    },

}