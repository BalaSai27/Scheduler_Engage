const express = require('express');
const authRouter = require('./routes/authRouter');
const subjectRouter = require('./routes/subjectRouter');
const { authenticateToken } = require('./helpers');

// running intialization part
const app = require('./intialization');

// middleware
app.use(express.json());

//Routers
app.use('/auth', authRouter); //authentication router
app.use('/subject', subjectRouter); //subject Router
app.use('/user', userRouter);

// get routes
app.get('/user', authenticateToken, (req, res) => {
    console.log(req.user);
    
});


// students selecting a preference

// allocation of preferences

// routes required
// subject routes for teacher
// 
// GET ROUTES: /subject/details, /subject/announcements, /subject/calendar, /subject/people
// POST ROUTES: /subject/create, /subject/makeAnnouncement, /subject/createMeeting, /subject/addStudent,
// subject routes for student
// GET ROUTES: /subject/details, /subject/announcements, /subject/calendar, /subject/people
// POST ROUTES: /subject/selectPreference