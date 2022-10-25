const{Router} = require("express");
const router = Router();
const { renderSignUpForm, signUp, logIn, logOut, renderLogIn } = require("../controllers/users.controllers");


router.get("/users/signup", renderSignUpForm)

router.post("/users/signup", signUp)

router.get("/users/login", renderLogIn)

router.post("/users/login", logIn)

router.get("/users/logout", logOut)


module.exports = router