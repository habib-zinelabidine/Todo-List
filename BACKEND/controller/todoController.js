const Joi = require("@hapi/joi");
const mongoose = require("mongoose");
const Todo = require('../modules/todoModel');
const User = require('../modules/userModels');


const Schema = {
  text: Joi.string().required(),
  isCompleted: Joi.boolean().required(),
  userId : Joi.string()
};

exports.getAll =async (req, res, next) => {
    
    try {
        const data = await Todo.find();
        res.status(200).json({data})
    } catch (error) {
        console.log(error);
        res.status(404).json({message: 'No data was found'});
    }

};

exports.getById = async (req, res, next) => {
  try {
    const data = await Todo.findById(req.params.tid);
    res.status(200).json({data});
  } catch (error) {
    res.status(404).json({message : 'No data was found!'});
  }
};

exports.getTodoByUserId = async (req,res,next)=>{
  const userId = req.params.uid;
  let UserTodos;
  try {
    UserTodos = await User.findById(userId).populate('todos');
  } catch (error) {
    res.status(500).json({message : "Something went wrong, please try again"});
  }
  if(!UserTodos || UserTodos.todos.length === 0){
    res.status(404).json({message : 'No todos for this user'});
  }
  res.status(200).json({ todos : UserTodos.todos});
}

exports.createTodo = async(req, res, next) => {
  const {text,isCompleted,userId} = req.body;
  const { error } = Joi.validate(req.body, Schema);
  if(error) {
      return res.status(401).json({message: "invalid data"})
  }
  //Create Todo
  const createtodos = new Todo({
    text,
    isCompleted,
    userId
  })
  let user;
  try {
    user = await User.findById(userId);

  } catch (error) {
    res.status(500).json({message : 'Something went wrong, please try again'});
  }
  if(!user){
    res.status(404).json({message : 'Could not find the provided user id!'});
  }
  console.log(user);
try {
  const sess = await mongoose.startSession();
  sess.startTransaction();
  await createtodos.save({session : sess});
  user.todos.push(createtodos);
  await user.save({session : sess});
  await sess.commitTransaction();

} catch (error) {
  console.log(error);
  return res.status(500).json({message: "Something went wrong"});
}
};

exports.deleteTodo = async (req, res, next) => {
  let todo;
  try {
    todo = await Todo.findById(req.params.tid).populate('userId');
  } catch (error) {
    return res.status(500).json({message : 'Something went wrong'});
  }
  if(!todo){
    res.status(404).json({message : 'No Todo found!'});
  }
  try {
    
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await todo.remove({session : sess});
    todo.userId.todos.pull(todo);
    await todo.userId.save({session : sess});
    await sess.commitTransaction();

  } catch (error) {
    return res.status(500).json({message : 'Something went wrong, could not delete'});
  }
  res.status(200).json({message : 'Todo deleted!'})
  
};

exports.updateTodo = async(req,res)=>{
  const {text,isCompleted} = req.body;
  let todo;
  try {
    todo = await Todo.findById(req.params.tid);
  } catch (error) {
    return res.status(500).json({message : 'Something went wrong, could not update'});
  }
  todo.text = text;
  todo.isCompleted = isCompleted;
  try {
    await todo.save();
  } catch (error) {
    return res.status(500).json({message : 'Something went wrong, could not update'});
  }
  res.status(200).json({message : 'todo updated successfully'});
}
