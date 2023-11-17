const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
    },
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
    }
})

module.exports =  mongoose.model("User", UserSchema)
