const userActive =(req,res,next)=>{
    if(req.session.user)
        {
            next();
        }
        else{
            res.redirect('/login')
        }
}

const userCheck = (req,res,next)=>{
    if(req.session.user)
    {
      res.redirect('todo-list')
    }
    else{
      next();
    }
}
module.exports = {userActive, userCheck}