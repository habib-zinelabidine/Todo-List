const Joi = require("@hapi/joi");


const Todo = require('../modules/todoModel');

const Schema = {
  text: Joi.string().required(),
  isCompleted: Joi.boolean().required(),
};

exports.getAll =async (req, res, next) => {
    
    try {
        const data = await Todo.find({userId: req.user._id});
        res.status(200).json({data})
    } catch (error) {
        console.log(error);
        res.status(404).json({message: 'No data was found'});
    }

};

exports.getById = (req, res, next) => {};

exports.createTodo = async(req, res, next) => {
    console.log(req.user);
  const { error } = Joi.validate(req.body, Schema);
  if(error) {
      return res.status(401).json({message: "invalid data"})
  }
  req.body.userId = req.user._id;
  //Create Todo
  try {
      const todo = await Todo.create(req.body);
      res.status(201).json({todo});
  } catch (error) {
    return res.status(400).json({message: "Something went wrong"});
  }
};

exports.deleteTodo = (req, res, next) => {
  
};
