const {Router} = require('express')
const todoController = require('../Controller/todoController')
const {userActive, userCheck} = require('../Middleware/userMiddle')

const router = new Router()

router.get('/',todoController.indexPage);
router.get('/login',userCheck,todoController.loginPage)
router.post('/login',userCheck,todoController.loginUser)
router.get('/todo-list',userActive, todoController.todolistPage)
router.get('/signup',userCheck, todoController.signupPage)




module.exports= router;