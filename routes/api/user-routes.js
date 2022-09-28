const router = require('express').Router();
const {
  getUser,
  getOneUser,
  createUser,
  deleteUser,
  addFriend,
  removeFriend,
  updateUser
} = require('../../controllers/user-controller');

// /api/users
router.route('/').get(getUser).post(createUser);

// /api/students/:studentId
router.route('/:userId').get(getOneUser).delete(deleteUser);

// /api/students/:studentId/assignments
router.route('/:userId/friend').post(addFriend);

// /api/students/:studentId/assignments/:assignmentId
router.route('/:userId/friends/:friendId').delete(removeFriend);

router.route('/:userId').put(updateUser);

module.exports = router;
