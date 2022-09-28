
const { Thoughts, User } = require('../models');

//CREATED: get all users, get 1 user, create user, udate user, delete user and thoughts

module.exports = {
    // Get all users
    getUser(req, res) {
      User.find({})
        .then(async (user) => {
          return res.json(user);
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).json(err);
        });
    }, //end get all users
    //get one user and populate friends(from user schema) and thoughts(from user schema)
    getOneUser(req, res) {
        User.findOne({ _id: req.params.userId }) //check what userid is!!!
            .populate("thoughts") 
            .populate("friends")
          .select('-__v')
          .then(async (user) =>
            !user
              ? res.status(404).json({ message: 'No user with that ID' })
              : res.json(user)
          )
          .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
          });
      },

    //create a user
    createUser(req, res) {
        User.create(req.body)
          .then((user) => res.json(user))
          .catch((err) => res.status(500).json(err));
      },
    
    //update a user
    updateUser(req, res) {
        User.findOneAndUpdate(
          { _id: req.params.userId },
          { $set: req.body },
          { runValidators: true, new: true }
        )
          .then((user) =>
            !user
              ? res.status(404).json({ message: 'No user with this id!' })
              : res.json(user)
          )
          .catch((err) => res.status(500).json(err));
      },

      //delete user
      deleteUser(req, res) {
        User.findOneAndRemove({ _id: req.params.userId })
          .then((user) =>
            !user
              ? res.status(404).json({ message: 'Could not find user!' })
              : Thoughts.deleteMany({ _id: { $in: user.thoughts}})
          )
          .then(() =>  res.json({message: "User and thoughts deleted!"}))
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      },

      //add and remove friends 
      addFriend(req, res) {
        User.findOneAndUpdate(
          { _id: req.params.userId },
          { $addToSet: { friends: req.params.friendId } },
          { runValidators: true, new: true }
        )
          .then((user) =>
            !user
              ? res.status(404).json({ message: 'User not found!' })
              : res.json(user)
          )
          .catch((err) => res.status(500).json(err));
      },

      removeFriend(req, res) {
        User.findOneAndUpdate(
          { _id: req.params.userId },
          { $pull: { friends: { friendId: req.params.friendId } } },
          { runValidators: true, new: true }
        )
          .then((user) =>
            !user
              ? res.status(404).json({ message: 'User not found!' })
              : res.json(user)
          )
          .catch((err) => res.status(500).json(err));
      },
    };