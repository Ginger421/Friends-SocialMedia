const { Schema, model } = require('mongoose');
const userSchema = require('./user.js');

//id body uname createdat tojson
const reactionsSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        userName: {
            type: String,
            required: true,
        },
        // createdAt: {
        //     type: Date,
        //     // default:
        //     // get: 
        // },
    },
    {
    toJSON: {
        virtuals: true,
        getters: true,
    },
    id: false
    }
)

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },

        // createdAt: {
        //     Date: true,
        //     //default: 
        //     //get: 
        //},
        userName: {
            type: String,
            required: true,
        },

        reactions: [reactionsSchema],

    },
    {
        toJSON: {
          virtuals: true,  
          getters: true,
        },
        id: false,
    }
)

const Thoughts = model('Thought', thoughtSchema);

module.export = Thoughts;

