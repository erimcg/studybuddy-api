const mongoose = require('mongoose')
const validator = require('validator')
const DAYSOFWEEK = require('./daysofweek')

const Schema = mongoose.Schema

const studyGroupSchema = new Schema({
    name: { type: String, required: true, trim: true },
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    is_public: { type: Boolean, required: true },
    max_participants: { type: Number, required: true },
    start_date: {
        type: Date,
        validate(value) {
            if (!validator.isISO8601(value.toJSON())) {
                throw new Error('Start date is invalid')
            }
        }
    },
    end_date: {
        type: Date,
        validate(value) {
            if (!validator.isISO8601(value.toJSON())) {
                throw new Error('Start date is invalid')
            }
        }
    },
    meeting_times: [{
        day: { type: String, enum: DAYSOFWEEK, required: true },
        time: {
            type: String,
            validate(value) {
                if (!validator.isTime(value)) {
                    throw new Error('Time is invalid')
                }
            },
            required: true
        },
        location: { type: String, required: true}
    }],
    description: String,
    school: String,
    course_number: String,
    participants: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
})

studyGroupSchema.index({ name: 'text', description: 'text' })

studyGroupSchema.methods.toJSON = function () {
    const group = this
    const groupObject = group.toObject()

    delete groupObject.__v
    return groupObject
}

const StudyGroup = mongoose.model('StudyGroup', studyGroupSchema)
module.exports = StudyGroup