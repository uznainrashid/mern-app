const Joi = require("joi");

const SignUpValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(4).max(100).required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    res.status(400).json({
      message: "Bad request",
      error,
    });
  }
  next();
};
const LoginValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(4).max(100).required(), 
  });
  const { error } = schema.validate(req.body);
  if (error) {
    res.status(400).json({
      message: "Bad request",
      error,
    });
  }
  next();
};

module.exports = {
  SignUpValidation,
  LoginValidation,
};
