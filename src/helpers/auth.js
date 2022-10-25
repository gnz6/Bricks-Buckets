const helpers = {};

helpers.isAuth = ((req,res,next)=>{
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error_msg", "Log in to proceed.")
    res.redirect("/users/login")
})

module.exports = helpers