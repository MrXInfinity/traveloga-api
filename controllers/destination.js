const Destination = require("../models/destinations");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError } = require("../errors");

const getAllDestinations = async (req, res) => {
  const { showCase, limitedOffers } = req.query;

  if (showCase) {
    const destinations = await Destination.find(
      { showCase },
      "title location image _id"
    );
    if (!destinations)
      throw new NotFoundError("There is no destination with this showcase");
    res.status(StatusCodes.OK).json({ destinations });
  }
  if (limitedOffers) {
    const destinations = await Destination.find(
      {
        "limitedOffers.domestic": { $gt: 0 },
        "limitedOffers.international": { $gt: 0 },
      },
      "image title location description limitedOffers _id"
    );
    if (!destinations)
      throw new NotFoundError(
        "There is no destination with this limited offer"
      );
    res.status(StatusCodes.OK).json(destinations);
  }

  const beach = await Destination.find(
    { category: "beach" },
    "title location image _id"
  );
  const landmark = await Destination.find(
    { category: "landmark" },
    "title location image _id"
  );
  const history = await Destination.find(
    { category: "history" },
    "title location image _id"
  );

  return res.status(StatusCodes.OK).json({ beach, landmark, history });
};

const getDestination = async (req, res) => {
  const { id } = req.params;
  const destination = await Destination.findOne({ _id: id });
  res.status(StatusCodes.OK).json({ destination });
};

module.exports = {
  getAllDestinations,
  getDestination,
};
