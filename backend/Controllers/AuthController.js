const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../Models/user");

const SignUp = async (req, res) => {

  try {
    const { name, email, password } = req.body;
    const users = await userModel.findOne({ email });
    // agr email already h  already h to sirf singup hoga
    if (users) {
      return res.Status(409).json({
        message: "User is already exists, you can login",
        success: false ,
      }); 
    }
    const UserModels = new userModel({ name, email, password });
    UserModels.password = await bcrypt.hash(password, 10);
    await UserModels.save();
    return res.status(201).json({
      message: "SignUp successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const users = await userModel.findOne({ email });
    // agr email already h  already h to sirf singup hoga
    const errorMsg = "Auth Failed email and password wrong";
    if (!users) {
      return res.Status(403).json({
        message: errorMsg,
        success: false,
      });
    }
    const isPasswordEqual = await bcrypt.compare(password, users.password);
    if (!isPasswordEqual) {
      return res.Status(403).json({
        message: errorMsg,
        success: false,
      });
    }
    const jwtToken = jwt.sign(
      {
        email: users.email,
        _id: users._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
    res.status(200).json({
      message: "Login successfully",
      success: true,
      email,
      jwtToken,
      name: users.name,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
  
};

module.exports = {
  SignUp,
  Login,
};
