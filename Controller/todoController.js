const dbConfig = require('../Configure/mongoConnection')
const listCollection = require('../Schema/listSchema')
const indexPage = (req,res)=>{
    res.render('./index.ejs')
}




module.exports= {
    indexPage
    
}