const {Router} = require('express')
const todoController = require('../Controller/todoController')

const router = new Router()

router.get('/',todoController.indexPage);
router.get('/login',todoController.loginPage)

module.exports= router;