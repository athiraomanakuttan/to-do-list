const {Router} = require('express')
const todoController = require('../Controller/todoController')
const {userActive, userCheck} = require('../Middleware/userMiddle')

const router = new Router()

router.get('/',todoController.indexPage);
router.get('/login',userCheck,todoController.loginPage);
router.post('/login',userCheck,todoController.loginUser);
router.get('/signup',userCheck, todoController.signupPage);
router.post('/signup',userCheck,todoController.signupUser);
router.get('/todo-list',userActive, todoController.todolistPage);



// ------------------ Task managemnt ----------------- 

router.post('/add-task',userActive,todoController.addNewTask);
router.post('/task-compleate',userActive,todoController.taskCompleate)
router.post('/delete-task',userActive,todoController.removeTask)





module.exports= router;