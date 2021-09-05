const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = 'My-note-book-tanmay-764464';

const fetchUser = (req, res, next)=>{
    // Get user from jwt token and add id
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error: "Access Denied"});
    }

    try {
        const data = jwt.verify(token, JWT_SECRET_KEY);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({error: "Access Denied"});
    }
}

module.exports = fetchUser;