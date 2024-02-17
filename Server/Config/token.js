const jwt = require('jsonwebtoken');


const generateToken = (id)=>{
    return jwt.sign({id}, process.env.JWT_SECRETKEY, {
        expiresIn: '3h',
    });
}

module.exports = generateToken;