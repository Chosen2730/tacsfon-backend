const Event = require("../models/eventSchema");
const Exco = require("../models/executiveSchema");
const Gallery = require("../models/gallerySchema");
const Testimony = require("../models/testimonySchema");
const { StatusCodes } = require("http-status-codes");

const getAllImages = async (req, res) => {
  const images = await Gallery.find().sort({ createdAt: -1 });
  if (images.length < 1) {
    res.status(StatusCodes.OK).json({ msg: "No image found", images });
    return;
  }
  res.status(StatusCodes.OK).json({ images, total: images.length });
};

const getAllEvents = async (req, res) => {
  const events = await Event.find().sort({ createdAt: -1 });
  if (events.length < 1) {
    res.status(StatusCodes.OK).json({ msg: "No event found", events });
    return;
  }
  res.status(StatusCodes.OK).json({ events, total: events.length });
};

const getAllTestimony = async (req, res) => {
  const testimony = await Testimony.find().sort({ createdAt: -1 });
  if (testimony.length < 1) {
    res.status(StatusCodes.OK).json({ msg: "No testimony found", testimony });
    return;
  }
  res.status(StatusCodes.OK).json({ testimony, total: testimony.length });
};

const getAllExco = async (req, res) => {
  const excos = await Exco.find().sort({ createdAt: -1 });
  if (excos.length < 1) {
    res.status(StatusCodes.OK).json({ msg: "No Exco found", excos });
    return;
  }
  res.status(StatusCodes.OK).json({ excos, total: excos.length });
};

const createTestimony = async (req, res) => {
  const { content } = req.body;
  if (!content) {
    throw new BadRequestError("Please enter your testimony details");
  }
  const testimony = await Testimony.create({ ...req.body });
  res.status(StatusCodes.CREATED).json({ testimony });
};

module.exports = {
  getAllEvents,
  getAllExco,
  getAllImages,
  getAllTestimony,
  createTestimony,
};
