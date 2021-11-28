const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// meeting schema: id, date of meeting, from, to, capacityAllowed, vaccinationStatusAllowed, StudentPreferences
const meetingSchema = new Schema({
    date: {
        type: String,
        required: true
    },
    from: {
        type: String, 
        required: true
    },
    to: {
        type: String, 
        required: true
    },
    allowedCapacity: {
        type: Number,
        required: true
    },
    vaccinationStatusAllowed: {
        type: Boolean,
        required: true
    },
    studentPreferences: {
        type: Array,
        required: true
    }
});

const Meeting = mongoose.model('Meeting', meetingSchema);
module.exports = Meeting;