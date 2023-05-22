const Bookings = require("../models/bookings");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const getAllBookings = async (req, res) => {
  const bookings = await Bookings.find({ bookedBy: req.user.userId });
  res.status(StatusCodes.OK).json(bookings);
};

const getBooking = async (req, res) => {
  const {
    user: { userId },
    params: { id },
  } = req;

  const bookings = await Bookings.findById({ _id: id, bookedBy: userId });
  if (!bookings)
    throw new NotFoundError("This bookings does not currently exist");
  res.status(StatusCodes.OK).json(bookings);
};

const addInTheCart = async (req, res) => {
  req.body.bookedBy = req.user.userId;
  await Bookings.create(req.body);
  res.status(StatusCodes.OK).json({ message: "Booking Successful!" });
};

const updateInfo = async (req, res) => {
  const {
    body: { status },
    user: { userId },
    params: { id },
  } = req;

  if (!status)
    throw new BadRequestError(
      "Please specify the status you want to update to"
    );
  req.body.updatedAt = Date.now();
  const update = await Bookings.findByIdAndUpdate(
    { _id: id, bookedBy: userId },
    req.body,
    { new: true, runValidators: true }
  );

  if (!update) throw new NotFoundError("This booking does not currently exist");
  const bookings = await Bookings.find({ bookedBy: req.user.userId });
  res
    .status(StatusCodes.OK)
    .json({ bookings, message: "Successfully Updated" });
};

const deleteItem = async (req, res) => {
  const {
    user: { userId },
    params: { id: bookingsId },
  } = req;

  if (!userId || !bookingsId) throw new BadRequestError("Bad Request Sent!");
  const update = await Bookings.findByIdAndDelete({
    _id: bookingsId,
    bookedBy: userId,
  });

  if (!update) throw new BadRequestError("Booking not found within the user");
  const bookings = await Bookings.find({ bookedBy: req.user.userId });

  res
    .status(StatusCodes.OK)
    .json({ bookings, message: "Successfully Deleted" });
};

module.exports = {
  getAllBookings,
  getBooking,
  addInTheCart,
  updateInfo,
  deleteItem,
};
