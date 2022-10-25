const { deserializeUser } = require("passport");
const passport = require("passport");
const localStrategy = require("passport-local").Strategy
const User = require("../models/User")

passport.use(new localStrategy({
    usernameField: "email",
    passwordField: "password"
},async(email, password, done)=>{
    //Match Email
    const user = await User.findOne({email})
    if(!user){
        return done(null, false, {message: "Email not registered"})
    }else{
        const match = await user.matchPassword(password)
        if(match){
            return done(null, user)
        }else{
            return done(null, false, {message:"Incorrect Password"})
        }
    }
}))

passport.serializeUser((user, done)=>{
    done(null, user.id);
})

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
     done(err, user);
    });
  });

module.exports={
    
}