const res = require('express/lib/response');
const jwt = require('jsonwebtoken');
const jwt_decode = require('jwt-decode');
const moment = require('moment');
const generatetoken = (data,exp)=>{
    return jwt.sign(data,process.env.token_secret,{expiresIn : exp});
}
const expireToken = (token)=>{
    try {
        const decoded = jwt_decode(token);
        timeNow = new Date();
        if((moment.unix(decoded.exp).toDate())<timeNow) return res.status(403).json("expired token");
    } catch (error) {
        res.status(400).json("Error");
    }
}
module.exports.generatetoken=generatetoken;
module.exports.expireToken=expireToken;
