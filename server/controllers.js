const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Student = require('./models/student');
const Teacher = require('./models/teacher');

// authenticateUser
async function authenticateUser(req, res, next) {
    const user = req.body.user;
    const isTeacher = req.body.isTeacher;
    if(isTeacher) {
        Teacher.findOne({mailId: user.mailId})
            .then(async (result) => {
                if(!result) return res.sendStatus(404);
                const _user=result;
                const isLoginValid = await bcrypt.compare(user.password, _user.password);
                if(!isLoginValid) return res.sendStatus(401);
                req.user=_user;
                next();
            })
            .catch((err) => {
                console.log(err);
                return res.sendStatus(500);
            })
    }
    else {
        Student.findOne({mailId: user.mailId})
            .then(async (result) => {
                if(!result) return res.sendStatus(404);
                const _user=result;
                const isLoginValid = await bcrypt.compare(user.password, _user.password);
                if(!isLoginValid) return res.sendStatus(401);
                req.user=_user;
                next();
            })
            .catch((err) => {
                return res.sendStatus(500);
            })
    }
}

// signupController
async function signupController(req, res) {
    
    const user = req.body.user;
    const mailId = user.mailId;
    const isTeacher = req.body.isTeacher;
    const hashedPassword = await bcrypt.hash(user.password, 10)
    console.log(user.name, user.password, user.vaccinationStatus, user.mailId, hashedPassword);
    
    if(isTeacher) {
        // checking whether teacher with entered mailId already exists or not!
        Teacher.find({mailId: mailId})
            .then((result) => {
                if(result.length!==0) res.status(200).json({error: "mailId already in use!"});
                console.log("teacher: ");
                console.log(result);
                
                //teacher with mailId doesn't exist, creating a new teacher 
                const teacher = new Teacher({
                    name: user.name,
                    password: hashedPassword, 
                    mailId: user.mailId,
                    subjects: []
                });
                res.sendStatus(200);
            })
            .catch((err) => {
                res.sendStatus(500);
            });
    } 
    else {
        // checking whether student with entered mailId already exists
        Student.find({mailId: mailId})
            .then((result) => {
                if(result.length!==0) return res.status(200).json({error: "mailId already in use!"});                
                
                //student with mailId doesn't exist, creating a new student
                const student = new Student({
                    name: user.name, 
                    password: hashedPassword,
                    mailId: user.mailId,
                    vaccinationStatus: user.vaccinationStatus,
                    subjects: []
                });
                student.save();
                res.sendStatus(200);
            })
            .catch((err) => {
                res.sendStatus(500);
            });
    }
}

function loginController(req, res) {
    const user = {
        name: req.user.name, 
        mailId: req.user.mailId,
        isTeacher: req.body.isTeacher,
        _id: req.user._id.toString()
    }
    console.log(user);
    // creating and sending back the access token
    const access_token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
    res.json({access_token});
}

module.exports = {
    authenticateUser,
    signupController,  
    loginController
}