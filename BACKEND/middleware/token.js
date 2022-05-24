const res = require("express/lib/response");
const jwt = require("jsonwebtoken");
const jwt_decode = require("jwt-decode");
const moment = require("moment");
const User = require('../modules/userModels');
const generatetoken = (data, exp) => {
  return jwt.sign(data, process.env.token_secret, { expiresIn: exp });
};

const expireToken = (token) => {
  try {
    const decoded = jwt_decode(token);
    timeNow = new Date();
    if (moment.unix(decoded.exp).toDate() < timeNow)
      return res.status(403).json("expired token");
  } catch (error) {
    res.status(400).json("Error");
  }
};

module.exports.authMiddleware =async (req, res, next) => {
  console.log(req.headers);
  const { authorization } = req.headers;
  if (!authorization)
    return res.status(403).json({ message: "please sign in" });
  const token = authorization.split(" ")[1];
  if (!token) return res.status(403).json({ message: "please sign in" });
  try {
      
      const decoded = jwt.decode(token);
      const user = await User.findById(decoded.id);
      if(!user) return res.json({message: 'Token belongs to no user'});
      req.user  = user;
      next();
  } catch (error) {
    console.log(error);
   return  res.status(403).json({ message: "please sign in" });
  }

 
};
module.exports.generatetoken = generatetoken;
module.exports.expireToken = expireToken;
