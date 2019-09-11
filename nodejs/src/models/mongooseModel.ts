import mongoose from "mongoose";

const Schema = mongoose.Schema;


export const userSchema = new Schema({
    googleId: {
        type: String,
    },
    googleToken: {
        type: String
    },
    firstname: {
        type: String,
        trim: true,
        default: ''
    },
    lastname: {
        type: String,
        trim: true,
        default: ''
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        required: true
    },
    img: {
        type: String
    },
    created_date: {
        type: Date,
        default: Date.now
    },
    tasks: [{type: Schema.Types.ObjectId, ref: 'tasks'}]
});

export const tasksSchema = new Schema({
    taskname: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ''
    },
    priority: {
        type: Number,
        default: 1
    },
    repetition: {
        type: String,
        default: ''
    },
    created_date: {
        type: Date,
        default: Date.now
    },
    date_from: {
        type: String
    },
    date_to: {
        type: String
    }
});