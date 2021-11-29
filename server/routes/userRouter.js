const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../helpers');
const Teacher = require('../models/teacher');

// router used for getting the user routes
router.get('/', (req, res) => {
    const isTeacher = req.user.isTeacher;
    const id = req.user._id;
    if(isTeacher) {
        Teacher.findOne({_id: id})
            .then((result) => {
                const name = result.name;
                const subjectIds = result.subjects;
                const subjectNames = [];
                subjectIds.map((key, value) => {
                    Subject.findOne({_id: key})
                        .then(result => {
                            subjectNames.push(result.name);
                        })
                });
            })
    }
});

module.exports = router;