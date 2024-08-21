const dbConfig = require('../Configure/mongoConnection')
const listCollection = require('../Schema/listSchema')
const userCollection = require('../Schema/userCollection')
const bcrypt = require('bcrypt')
let  globalNotification = {}
const mongoose = require('mongoose');  // Correctly import mongoose
const ObjectId = mongoose.Types.ObjectId; 


const indexPage = (req,res)=>{
    let notification ={}
    if(globalNotification.status)
        notification = globalNotification;
    res.render('./index.ejs',notification);
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

const loginUser = async (req, res) => {
    const userEmail = req.body.email;
    const userPassword = req.body.password;
    try {
        const loginDetails = await userCollection.findOne({ userEmail: userEmail });
        if (loginDetails) {
            const isMatch = await bcrypt.compare(userPassword, loginDetails.password);
            if (isMatch) {
                req.session.user = loginDetails._id
                return res.redirect('/todo-list');
            } else {
                globalNotification = {
                    status: 'error',
                    message: 'Incorrect password'
                };
            }
        } else {
            globalNotification = {
                status: 'error',
                message: 'User Not Found. Please Signup!'
            };
        }
    } catch (err) {
        globalNotification = {
            status: 'error',
            message: 'Unable to Login. Try Again.'
        };
    }
    return res.redirect('/login');
};




// ----------------------- SIgn up page ----------------------------

const signupPage = (req,res)=>{
    let notification ={}
    if(globalNotification.status)
        notification = globalNotification;
    res.render('./signup-page' ,notification)
}

const signupUser =async (req,res)=>{
    const data = req.body; 
    const saltRounds = 10;
    data.password = await bcrypt.hash(data.password, saltRounds);
    const addData = await userCollection.insertMany(data);

    console.log(data.password)
    if(addData)
        res.redirect('/login')
    else
        res.redirect('/signup')

}

const addNewTask = async (req,res)=>{
    const data = req.body;
    let user_id = req.session.user;
    const findData = await listCollection.findOne({ user_id: user_id });
    if(findData)
    {
        findData.list.push(data);
        await findData.save()
    }
    else
    {
        const newList = new listCollection({ 
            user_id : user_id,
            list: [data]
        })
        await newList.save();
    }
try
{
    const addTask = await listCollection.insertMany(data)
}  
catch(err)
{
    console.log("Error occured in task adding", err)
}  
res.redirect('/todo-list')

}

const taskCompleate = async (req, res) => {
    const data = req.body;
    console.log('Received data:', data);  // Debugging line
    const userId = req.session.id;

    try {
        const updateStatus = await listCollection.findOneAndUpdate(
            { _id: new ObjectId(data.id), 'list._id': new ObjectId(data.taskId) },  // Convert both `data.id` and `data.taskId` to ObjectId
            { $set: { 'list.$.task_status': 1 } },
            { new: true }
        );
        console.log("updateStatus",updateStatus)
        if (updateStatus) {
            res.status(200).json({ message: 'Successfully updated' });
        } else {
            res.status(400).json({ message: "Couldn't update status" });
        }
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: 'Something went wrong' });
    }
}


const removeTask = async (req,res)=>{
    const data = req.body;
    const user_id = req.session.user
    try{
        const result = await listCollection.findOneAndUpdate(
            { _id: new ObjectId(data.id), 'list._id': new ObjectId(data.taskId),user_id: user_id, }, 
            { $pull: { list: { _id: new ObjectId(data.taskId) } } } 
        );
        if(result)
            return res.status(200).json()
    }catch(err)
    {
    console.log('removeTask error ', err)
    }
    return res.status(400).json()
    }

// ------------------------ to do list page --------------------------- 

const todolistPage = async (req, res) => {
    let user_id = req.session.user;
    let taskList = [],upcoming=[], taskUserId = null;

    try {
        // Create new Date instances for start and end times
        const today = new Date();
        const startDate = new Date(today.setHours(0, 0, 0, 0));  // Start time: 00:00 AM
        const endDate = new Date(today.setHours(23, 59, 59, 999));  // End time: 23:59:59 PM
        const nextDay = new Date(today);
    nextDay.setUTCDate(today.getUTCDate() + 1);
    
        const taskData = await listCollection.findOne(
            {
                user_id: user_id,
                'list.task_date': {
                    $gte: startDate,
                    $lte: endDate
                }
                
            },
            { list: 1 }
        );
         const upcominglist = await listCollection.findOne(
            {
                $and:[
                   { user_id : new ObjectId(user_id) },
                   { 'list.task_date': {
                    $gte: nextDay
                }},
                {'list.task_status':0},
                {
                    
                }
                ]
            },
            { list: 1 }
        );
        if (taskData) {
            taskList = taskData.list;
            taskUserId = taskData._id;

            // Filter tasks to include only those with `task_date` within today's range
            taskList = taskList.filter(task => 
                new Date(task.task_date) >= startDate && new Date(task.task_date) <= endDate
            );
        }
        if(upcominglist)
        {
            upcoming = upcominglist.list.filter(task =>
                new Date(task.task_date) >= endDate
            );
           
        }

    } catch (err) {
        console.log("Error in fetching data:", err);
    }

    res.render('./to-do-page', { taskList, taskUserId,upcoming,changeDate});
};



function formatDate(inputDate, daysToAdd = 0) {
    console.log("hey ")
    const date = new Date(inputDate);

    // Add days to the date
    date.setDate(date.getDate() + daysToAdd);

    const options = { year: 'numeric', month: 'short', day: 'numeric', weekday: 'short' };
     let newDate =date.toLocaleDateString('en-US', options);
     console.log(newDate,"newDate")
     return newDate


}

function changeDate(date)
   {
  const options = { weekday: 'short', month: 'short', day: 'numeric' };
  const formattedDate = date.toLocaleDateString('en-GB', options);
  return formattedDate;
   }

module.exports= {
    indexPage,
    loginPage,
    loginUser,
    todolistPage,
    signupPage,
    signupUser,
    addNewTask,
    taskCompleate,
    removeTask
}