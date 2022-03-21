const {Router}=require('express');
const userController = require('../controller/userController');


const router=Router();
router.post('/register',userController.signupUser);
router.post('/login',userController.loginUser);

module.exports = router;