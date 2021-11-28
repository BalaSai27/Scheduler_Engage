const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// student schema:{studentId, name, mailId, hashedPassword, vaccinationStatus,
// subjects: [{subjectId, offlineClassesAttended, meetings: [{meetingId, selectedPreference, allotedPreference}]}}]}

const studentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    mailId: {
        type: String,
        required: true
    }, 
    password: {
        type: String, 
        required: true
    }, 
    vaccinationStatus: {
        type: Number, 
        required: true
    },
    subjects: {
        type: Array, 
        required: true
    }
});

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;