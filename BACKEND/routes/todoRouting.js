const {Router}=require('express');
const todoController = require('../controller/todoController');

const {authMiddleware} = require('../middleware/token');

const router=Router();

router.get('/', todoController.getAll);
router.get('/:tid',todoController.getById);
router.get('/users/:uid',todoController.getTodoByUserId);
router.post('/', todoController.createTodo);
router.patch('/:tid',todoController.updateTodo);
router.delete('/:tid',todoController.deleteTodo);

module.exports = router;
