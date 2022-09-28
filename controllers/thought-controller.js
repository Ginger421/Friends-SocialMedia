// WHEN I test API POST, PUT, and DELETE routes in Insomnia
// THEN I am able to successfully create, update, and delete users and thoughts in my database

const { Thoughts } = require("../models");



// WHEN I test API POST and DELETE routes in Insomnia
// THEN I am able to successfully create and delete reactions to thoughts and add and remove friends to a user’s friend list

module.exports = {
    getThoughts(req, res) {
        Thoughts.find()
          .then((thoughts) => res.json(thoughts))
          .catch((err) => res.status(500).json(err));
      },
      createThought(req, res) {
        Thoughts.create(req.body)
          .then((thoughts) => res.json(thoughts))
          .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
          });
      },
      getOneThought(req, res) {
        Thoughts.findOne()
        .then((thoughts) => res.json(thoughts))
        .catch((err) => res.status(500).json(err))
      },
      // Delete a course
      deleteThought(req, res) {
        Thoughts.findOneAndDelete({ _id: req.params.thoughtsId })
          .then((thoughts) =>
            !thoughts
              ? res.status(404).json({ message: 'No thought found!' })
              : User.deleteMany({ _id: { $in: course.user } })
          )
          .then(() => res.json({ message: 'Thought deleted!' }))
          .catch((err) => res.status(500).json(err));
      },
      // Update a course
      updateThought(req, res) {
        Thoughts.findOneAndUpdate(
          { _id: req.params.thoughtsId },
          { $set: req.body },
          { runValidators: true, new: true }
        )
          .then((thoughts) =>
            !thoughts
              ? res.status(404).json({ message: 'No course with this id!' })
              : res.json(course)
          )
          .catch((err) => res.status(500).json(err));
      }
    };
    