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
        return res.status(400).json({message : error.details[0].message});
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
    const createUser = new User({
        email,
        password : hashedpassword,
        todos : []
    })
    try {
        await createUser.save();
        res.status(200).json({createUser});
    } catch (error) {
        return res.status(500).json({message : 'Something went wrong, please try again'});
        
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
exports.getUsers = async (req,res)=>{
    
    try {
        const user = await User.find().populate('todos');
        res.status(200).json({users : user});
    } catch (error) {
        res.status(500).json({message : 'Something went wrong, please try again'});
    }
}

exports.signupUser = signupUser ;
exports.loginUser = loginUser;
