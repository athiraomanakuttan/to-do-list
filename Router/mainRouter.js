const {Router} = require('express')
const todoController = require('../Controller/todoController')
const userActive = require('../Middleware/userMiddle')

const router = new Router()

router.get('/',todoController.indexPage);


module.exports= router;