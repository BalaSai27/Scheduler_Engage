const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// subject schema: {subjectId, name, createdBy, teachers:[{teacherId}], students:[{studentId}], announcements:[{message, time}],
// meetings: [{meetingId, from, to, capacityAllowed, partiallyOrFully, studentPreferences:[{studentId, submittedTime, selectedPref}]}]}
// subject schema: {subjectId, name, createdBy, students:[{studentId}], announcements:[{message, time}],
// meetingIds, description

const subjectSchema = new Schema({
    name: {
        type: String, 
        required: true
    }, 
    createdBy: {
        type: String, 
        required: true
    },
    students: {
        type: Array, 
        required: true   
    }, 
    meetings: {
        type: Array, 
        required: true
    }
});

const Subject = mongoose.model('Subject', subjectSchema);
module.exports = Subject;