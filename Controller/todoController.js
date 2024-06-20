
const indexPage = (req,res)=>{
    res.render('./index.ejs')
}

const loginPage = (req,res)=>{
    res.render('./loginPage.ejs')
}

module.exports= {
    indexPage,
    loginPage,
}