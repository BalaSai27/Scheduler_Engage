const jwt = require('jsonwebtoken');

// authenticating jsonwebtoken sent by the user
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    if(!authHeader) res.sendStatus(401); 
    const access_token = authHeader.split(' ')[1];
    if(!access_token) res.sendStatus(403);
    jwt.verify(access_token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) res.sendStaus(403);
        if(!user) res.sendStatus(403);
        req.user=user;
        next();
    })
}

module.exports = {
    authenticateToken,
}