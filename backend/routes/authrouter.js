const { SignUp, Login } = require("../Controllers/AuthController");
const {
  SignUpValidation,
  LoginValidation,
} = require("../Middleware/AuthValidation");

const router = require("express").Router(); 

router.post("/signup", SignUpValidation, SignUp);
router.post("/login", LoginValidation, Login);

module.exports = router;    
