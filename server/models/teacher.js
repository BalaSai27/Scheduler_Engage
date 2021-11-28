const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// teacher schema:{teacherId, name, mailId, hashedPassword, subjects:[{subjectId, subjectName}]}
const teacherSchema = new Schema({
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
    subjects: {
        type: Array,
        required: true
    }
});

const Teacher = mongoose.model('Teacher', teacherSchema);
module.exports = Teacher;