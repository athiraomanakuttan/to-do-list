const  express = require('express')
const app = express()
const port = 5000
const mainRouter = require('./Router/mainRouter')
const session = require('express-session')


app.set('view engine','ejs')
app.set('views','View');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('Public'))
app.use(session({
    secret:'secret-key',
    resave:false,
    saveUninitialized:false
}))


app.use('/', mainRouter)
app.listen(port, () => console.log(`server running in http://localhost:${port}`))