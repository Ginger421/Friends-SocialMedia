const { Schema, model } = require('mongoose');
const thoughtSchema = require('./thought');

// email
// String
// Required
// Unique
// Must match a valid email address (look into Mongoose's matching validation) NEED THIS

// thoughts
// Array of _id values referencing the Thought model //IS CORRECT

// friends
// Array of _id values referencing the User model (self-reference)
// Schema Settings:
// Create a virtual called friendCount that retrieves the length of the user's friends array field on query.


const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        }, //end username

        email: {
            type: String,
            unique: true,
            required: true,
            //matches valid email
        }, //end username

        thoughts: [
          {
            type: Schema.Types.ObjectId,
            ref: 'Thoughts'
          }
        ],

        friends: [
            {
              type: Schema.Types.ObjectId,
              ref: 'User', 
            },
          ],

    },
    {
        toJSON: {
          virtuals: true,
        },
        id: false,
      }
)

const User = model('User', userSchema);

module.exports = User;