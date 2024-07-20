const dbConfig = require('../Configure/mongoConnection')
const listCollection = require('../Schema/listSchema')
const indexPage = (req,res)=>{
    res.render('./index.ejs')
}


// ------------------------- Load login page ---------------------- 

const loginPage = async (req,res)=>{
    res.render('loginPage')
}



module.exports= {
    indexPage,
    loginPage    
}