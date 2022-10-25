const User = require("../models/users")
const {StatusCodes} = require("http-status-codes")
const {BadRequestError, UnauthenticatedError} = require("../errors")

const register = async (req, res) => {
    const user = await User.create({...req.body})
    res.status(200).json({message: "Account created successfuly"})
}

const login = async (req, res) => {
    const {email, password} = req.body
    if (!email || !password) throw new BadRequestError("")

    const user = await User.findOne({email})
    if (!user) throw new UnauthenticatedError("Email Incorrect")

    const passwordValidation = await user.comparePassword(password)
    if (!passwordValidation) throw new UnauthenticatedError("Password Incorrect")

    const token = user.createJWT()
    res.status(StatusCodes.OK).json({ user: {firstname: user.firstname, userId: user._id }, token })
}

module.exports = {
    register,
    login
}