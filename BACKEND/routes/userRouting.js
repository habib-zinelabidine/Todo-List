const { text } = require('body-parser');
const {Router}=require('express');
const userController = require('../controller/userController');


const router=Router();
router.post('/register',userController.signupUser);
router.post('/login',userController.loginUser);
/*
router.route('/todos').get(authMiddlware, todosController.getAll()).post(newTodo)
router.route('/todos/:id').get(todosController.getOne()).delete(todoController.deleteTodo).put(todoController.updateTodo)
*/


module.exports = router;