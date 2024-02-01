const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema
const userSchema = new Schema({
    email: {
        type: String, unique: true, required: true, trim: true, lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) { throw new Error('Email is invalid.') }
        }
    },
    username: { type: String, required: true, trim: true },
    password: { type: String, required: true, trim: true, minLength: 8 },
    school: { type: String, required: true },
    email_verified: { type: Boolean, default: false },
    majors: [String], tokens: [String],
    profile_pic: Buffer
})

userSchema.pre('save', async function (next) {
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next() // continue and run the save() method 
})

userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()
    
    delete userObject.password
    delete userObject.__v
    
    return userObject
}

const User = mongoose.model('User', userSchema);
module.exports = User