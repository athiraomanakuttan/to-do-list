const dbConfig = require('../Configure/mongoConnection')
const listCollection = require('../Schema/listSchema')
const userCollection = require('../Schema/userCollection')
const bcrypt = require('bcrypt')
let  globalNotification = {}


const indexPage = (req,res)=>{
    let notification ={}
    if(globalNotification.status)
        notification = globalNotification;
    res.render('./index.ejs',notification)
}


// ------------------------- Load login page ---------------------- 

const loginPage = async (req,res)=>{
    let notification ={}
    if(globalNotification.status)
    {
        notification = globalNotification;
        globalNotification={}
    }
    res.render('loginPage');
}

// ------------------------ Login User ----------------------------------- 

const loginUser = async (req,res)=>{
    const userEmail = req.body.email
    const userPassword = req.body.password
    try{
        const loginDetails  = await userCollection.findOne({userEmail : userEmail})
        if(loginDetails){
            if(bcrypt.compare(loginDetails.password, userPassword))
            {
                res.redirect('/todo-list')
            }
            else{
                globalNotification ={
                    status:'error',
                    message:'Incorrect password'
                }
            }
        }
        else
        {
            globalNotification ={
                status:'error',
                message:'User Not Found. Please Signup !'
            }
        }
    }
    catch(err)
    {
        globalNotification ={
            status:'error',
            message:'Unable to Login Try Again'
        }
    }
    res.redirect('/login')
}

// ------------------------ to do list page --------------------------- 

const todolistPage = async (req,res)=>{

    res.render('./to-do-page')
}

// ----------------------- SIgn up page ----------------------------

const signupPage = (req,res)=>{
    let notification ={}
    if(globalNotification.status)
        notification = globalNotification;
    res.render('./signup-page' ,notification)
}

module.exports= {
    indexPage,
    loginPage,
    loginUser,
    todolistPage,
    signupPage
}