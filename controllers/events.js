const { StatusCodes } = require("http-status-codes");
const Event = require("../models/eventSchema");
const { BadRequestError } = require("../errors");
const uploadImage = require("../middlewares/imageUploader");
const deleteImage = require("../middlewares/deleteImage");

const getAllEvents = async (req, res) => {
  const events = await Event.find().sort({ createdAt: -1 });
  if (events.length < 1) {
    res.status(StatusCodes.OK).json({ msg: "No event found", events });
    return;
  }
  res.status(StatusCodes.OK).json({ events, total: events.length });
};

const createEvent = async (req, res) => {
  const { name, date } = req.body;
  if (!name || !date) {
    throw new BadRequestError(
      "Please provide a name, date, and valid image url"
    );
  }
  const { public_id, secure_url } = await uploadImage(req, "events");
  const events = await Event.create({
    ...req.body,
    image: { url: secure_url, imageId: public_id },
  });
  res.status(StatusCodes.CREATED).json({ events });
};

const updateEvent = async (req, res) => {
  const { id } = req.params;
  let update = req.body;

  const event = await Event.findOne({ _id: id });

  if (!event) {
    throw new BadRequestError("event not found");
  }

  const {
    image: { imageId },
  } = event;

  const newImg = req.files?.image;
  if (newImg) {
    if (imageId) {
      await deleteImage(imageId);
    }
    const { public_id, secure_url } = await uploadImage(req, "events");
    update = { ...req.body, image: { url: secure_url, imageId: public_id } };
  }

  const newEvent = await Event.findOneAndUpdate({ _id: id }, update, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ newEvent, msg: "event details successfully updated" });
};

const deleteEvent = async (req, res) => {
  const { id } = req.params;

  const event = await Event.findOne({ _id: id });
  if (!event) {
    throw new BadRequestError(`Event with id ${id} not found`);
  }

  const {
    image: { imageId },
  } = event;
  if (imageId) {
    await deleteImage(imageId);
  }

  await Event.findOneAndRemove({ _id: id });

  res
    .status(StatusCodes.OK)
    .json({ msg: `event with id ${id} has been deleted successfully` });
};

module.exports = { getAllEvents, createEvent, updateEvent, deleteEvent };
