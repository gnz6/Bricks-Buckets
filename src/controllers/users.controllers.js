const  User  = require("../models/User");
const passport = require("passport")
const userController = {}

userController.renderSignUpForm = (req,res)=>{
    res.render("users/signup")
}

userController.signUp = async(req,res)=>{
    try {
        const{name,email,password,confirm_password}= req.body;
        const errors=[]
        if(password !== confirm_password){
           errors.push(({text: "Incorrect Password/Confirmation"}))
        }
        if(password.length < 4){
            errors.push(({text: "Password must be at least 4 characters"}))
        }
        if(errors.length > 0){
            res.render("users/signup",{
                errors, name, email
            })
        }else{
          const finduser =  await User.findOne({email:email})
          if(finduser){
            req.flash("error_msg", " Email already in use")
            res.redirect("/users/signup")
          }
            const newUser = await new User({name, email, password})
            newUser.password= await newUser.encryptPassword(password)
            await newUser.save()
            req.flash("success_msg", "Regitered")
            res.redirect("/users/login")
        }
        
    } catch (error) {
        console.log(error)
    }
    
}


userController.renderLogIn = (req,res)=>{
    res.render("users/login")
}

userController.logIn = passport.authenticate("local",{
    failureRedirect: "/users/login",
    successRedirect:"/notes",
    failureFlash: true
})

userController.logOut = (req,res)=>{
    
req.logout(()=>{
    req.flash("success_msg", "Logged Out")
    res.redirect("/users/login")
});
}
module.exports = userController