const Users = require("../models/users")
const {StatusCodes} = require("http-status-codes")
const {BadRequestError, UnauthenticatedError, NotFoundError} = require("../errors")

const getUser = async (req, res) => {
    const {id} = req.params 
    const users = await Users.findOne({_id: id})
    res.status(StatusCodes.OK).json({firstname: users.firstname, lastname: users.lastname, email: users.email})
}

const updateUser = async (req, res) => {
    const {
        body: {
            firstname,
            lastname,
            email,
            password,
            currentPassword
        },
        user: {
            password: userPassword, 
            userId        
        },
        params: {id}
    } = req
    
    if (!firstname && !lastname && !email && !password && !currentPassword) throw new BadRequestError("Input the necessary details to update email.")
    if(!currentPassword) throw new BadRequestError("Please provide your current password.")
    if (id !== userId) throw new UnauthenticatedError("Invalid Credentials.")
    const updateUser = await Users.findByIdAndUpdate(
        {_id: id, password: userPassword},
        req.body,
        { new: true, runValidators: true }
    )
    if (!updateUser) throw new NotFoundError("This user does not currently exist")
    res.status(StatusCodes.OK).json({ user: {firstname: updateUser.firstname, userId: updateUser._id }})
}

//ADMIN OPTIONS
const getAllUsers = async (req, res) => {
    const users = await Users.find(req)
    res.status(200).json(users)
}

const deleteUser = async (req, res) => {
    res.send("User deleted")
}

module.exports = {
    getUser,
    updateUser,
    getAllUsers,
    deleteUser
}
