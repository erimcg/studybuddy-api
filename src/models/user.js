const mongoose = require('mongoose')
const Schema = mongoose.Schema
const userSchema = new Schema({
    email: { type: String, unique: true, required: true, trim: true, lowercase: true },
    username: { type: String, required: true, trim: true },
    password: { type: String, required: true, trim: true, minLength: 8 },
    school: { type: String, required: true },
    email_verified: { type: Boolean, default: false },
    majors: [String], tokens: [String],
    profile_pic: Buffer
})

const User = mongoose.model('User', userSchema);
module.exports = User