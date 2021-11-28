const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../helpers');
const Teacher = require('../models/teacher');
const Subject = require('../models/subject');
const Meeting = require('../models/meeting');

// creating a new subject
router.post('/create', authenticateToken, async (req, res) => {
    const mailId = req.user.mailId;
    const subjectName = req.body.name;
    const isTeacher = req.user.isTeacher;
    const teacherId = req.user._id;

    if(!isTeacher) return res.sendStatus(403);
    const newSubject = new Subject({
        name: subjectName, 
        createdBy: teacherId, 
        students: [], 
        annoucements: [], 
        meetings: []
    });
    newSubject.save((err, result) => {

       const subjectId=result._id.toString();
        // adding subject to the teacher subjects list
        Teacher.updateOne({mailId: mailId}, {$push: {subjects: {subjectId, subjectName}}})
            .then(result => {
                return res.sendStatus(200);
            })
            .catch(err => {
                return res.sendStatus(500);
            })
    });
    
});

router.get('/details/:id', authenticateToken, (req, res) => {
    const id=req.params.id;
    Subject.findOne({_id: id})
        .then(result => {
            res.json(result);
            console.log(result);
        })
        .catch(err => {
            res.sendStatus(500);
        })
});

router.post('/makeAnnouncement', authenticateToken, (req, res) => {
    if(!req.user.isTeacher) return res.setStatus(401);
    const teacherId = req.user._id;
    const subjectId = req.body.subjectId;
    const announcement = req.body.announcement;

    Subject.findOne({_id: subjectId})
        .then(result => {
            if(teacherId!==result.createdBy) return res.sendStatus(401);
            console.log(teacherId);
            console.log(result.createdBy);
            Subject.updateOne({_id: subjectId}, {$push: {announcements: announcement}})
                .then(result => {
                    res.sendStatus(200);
                })
                .catch(err => {
                    res.sendStatus(500);
                })
        })
        .catch(err => {
            res.sendStatus(500);
        })
    
});

router.get('/announcements/:id', authenticateToken, (req, res) => {
    const id = req.params.id;
    Subject.findOne({_id: id})
        .then(result => {
            const announcements = result.announcements;
            res.status(200).json(announcements);
        })
        .catch((err) => {
            res.sendStatus(500);
        })
})


router.post('/createMeeting', authenticateToken, (req, res) => {
    if(!req.user.isTeacher) return res.sendStatus(401);
    const subjectId = req.body.subjectId;
    const date = req.body.date;
    const from = req.body.from;
    const to = req.body.to;
    const vaccinationStatusAllowed = req.body.arePartiallyVaccinatedAllowed;
    const allowedCapacity = req.body.allowedCapacity;
    Subject.findOne({_id: subjectId})
        .then((result) => {
            console.log(result);
            if(result.createdBy!==req.user._id) return res.sendStatus(401);
            const newMeeting = new Meeting({
                date, 
                from,
                to, 
                vaccinationStatusAllowed, 
                allowedCapacity
            });
        
            newMeeting.save((err, result) => {
                const meetingId = result._id.toString();
                Subject.updateOne({_id: subjectId}, {$push: {meetings: meetingId}})
                    .then((result) => {
                        res.sendStatus(200);
                    })
                    .catch((err) => {
                        res.sendStatus(500);
                    })
            });
        })

});

router.get('/people/:id', authenticateToken, (req, res) => {
    const id = req.params.id;
    Subject.findOne({_id:id})
        .then((result) => {
            const teacherId = result.createdBy;
            const studentIds = result.student;
            const studentNames = [];
            // getting Teacher Name
            Teacher.findOne({_id: teacherId})
                .then((result) => {
                    const teacherName = result.name;
                    studentIds.map((key, val) => {
                        Student.findOne({_id: val})
                            .then((result) => {
                                studentNames.push(result.name);
                            })
                            .catch((err) => {
                                res.sendStatus(500);
                            })
                    })
                    res.json({teacher: teacherName, students: studentNames});
                })
                .catch((err) => {
                    res.sendStatus(500);
                })
        });
});


module.exports = router;