const { findAllUsers, createUser, findUser, addFriend, deleteFriend, updateUser, deleteUser } = require('../../controllers/userController');

const router = require('express').Router();

router.route("/").get(findAllUsers).post(createUser)

router.route("/:userId").get(findUser).put(updateUser).delete(deleteUser)

router.route("/:userId/friends/:friendId").post(addFriend).delete(deleteFriend)

module.exports = router;