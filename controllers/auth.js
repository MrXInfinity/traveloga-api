const User = require("../models/users");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const register = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  if (!firstname || !lastname || !email || !password)
    throw new BadRequestError("Please provide the necessary info.");

  const user = await User.create({ ...req.body });
  const token = user.createJWT();
  res.status(200).json({ token, message: "Account created successfuly" });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    throw new BadRequestError("Please provide the necessary info.");

  const user = await User.findOne({ email });
  const passwordValidation = await user.comparePassword(password);
  if (!email || !passwordValidation)
    throw new UnauthenticatedError("Incorrect email and/or password.");

  const token = user.createJWT();
  res.status(StatusCodes.OK).json(token);
};

module.exports = {
  register,
  login,
};
