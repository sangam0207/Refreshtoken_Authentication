const jwt = require('jsonwebtoken');

const verifyUser = (req, res, next) => {
    const authHeader = req.headers.authorization||req.headers.Authorization;

    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized user ' });
    }

     const token = authHeader.split(' ')[1];
     console.log(token)
    jwt.verify(token, process.env.Access_Token_Secret, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Forbidden: Invalid token' });
        }

        req.user = decoded.id;
        next();
    });
};

module.exports = { verifyUser };
