const express = require('express');
const router = express.Router();
const { authenticateUser, loginController, signupController} = require('../controllers');


//authentication routes
router.post('/signup', async (req, res) => {
    signupController(req, res);
});

router.post('/login', authenticateUser, (req, res) => {
    loginController(req, res);
});


module.exports = router;