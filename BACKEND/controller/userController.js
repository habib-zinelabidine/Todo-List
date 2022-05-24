const joi =require('@hapi/joi');
const User = require('../modules/userModels');
const express = require('express');
const bcrypt = require('bcrypt');
const {generatetoken,expiredToken} =require('../middleware/token'); 
const Schema= {
    email :joi.string().required().email(),
    password : joi.string().required().min(6)
}

const signupUser=async (req,res)=>{
    //validation (joi:validate champ vide)

    const {error} = joi.validate(req.body,Schema);
    if(error){
        return res.status(400).send(error.details[0].message);
    }
    //unique email

    const emailExist = await User.findOne({email:req.body.email});
    console.log(emailExist)
    if(emailExist){
        
        return res.status(400).send({message :"Email already exist"});
    }
    //hash password

    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(req.body.password,salt);


    const {email,password}=req.body;
    try {
        const user = await User.create({email,password : hashedpassword});
        const token = generatetoken({id:user._id},"24h");
        const refreshToken = generatetoken({id:user._id},"8d"); 
        const result = {
            "id" : user._id,
            "email" : user.email,
            "token" : token,
            "refreshToken" : refreshToken
        }
        res.status(200).json(result);
    } catch (error) {
        return res.status(400).json(result);
        
    }
    
    

}

const loginUser = async (req,res)=>{
    const {email,password} = req.body;
    const {error} = joi.validate(req.body,Schema);
    if(error){
        return res.status(400).send(error.details[0].message);
    }
    const emailExist = await User.findOne({email:req.body.email});
    
    if(!emailExist){
        return res.status(400).json("Email does not exist");
    }

    const hashedpassword = await bcrypt.compare(req.body.password,emailExist.password);
    if(!hashedpassword){
        return res.status(400).json("invalide Password");
    }
    const token = generatetoken({id:emailExist._id},"24h");
    const refreshToken = generatetoken({id:emailExist._id},"8d"); 
    const result = {
        "id" : emailExist._id,
        "email" : emailExist.email,
        "token" : token,
        "refreshToken" : refreshToken
    }
    res.status(200).json(result);


}

exports.signupUser = signupUser ;
exports.loginUser = loginUser;
