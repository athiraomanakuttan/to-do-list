const {Router} = require('express')
const todoController = require('../Controller/todoController')
const {userActive, userCheck} = require('../Middleware/userMiddle')

const router = new Router()

router.get('/',todoController.indexPage);
router.get('/login',userCheck,todoController.loginPage)


module.exports= router;