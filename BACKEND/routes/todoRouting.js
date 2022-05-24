const {Router}=require('express');
const todoController = require('../controller/todoController');

const {authMiddleware} = require('../middleware/token');

const router=Router();

router.route('/').post(authMiddleware, todoController.createTodo).get(authMiddleware, todoController.getAll);

module.exports = router;
