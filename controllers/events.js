const { StatusCodes } = require("http-status-codes");
const Event = require("../models/eventSchema");
const { BadRequestError } = require("../errors");

const getAllEvents = async (req, res) => {
  const events = await Event.find().sort({ createdAt: -1 });
  if (events.length < 1) {
    res.status(StatusCodes.OK).json({ msg: "No event found", events });
    return;
  }
  res.status(StatusCodes.OK).json({ events, total: events.length });
};

const createEvent = async (req, res) => {
  const { name, imageUrl, date } = req.body;
  if (!name || !date || !imageUrl) {
    throw new BadRequestError(
      "Please provide a name, date, and valid image url"
    );
  }
  const events = await Event.create({ ...req.body });
  res.status(StatusCodes.CREATED).json({ events });
};

const updateEvent = async (req, res) => {
  const { id } = req.params;
  const event = await Event.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!event) {
    throw new BadRequestError("event not found");
  }
  res.status(200).json({ event, msg: "event details successfully updated" });
};

const deleteEvent = async (req, res) => {
  const { id } = req.params;
  const event = await Event.findOneAndRemove({ _id: id });
  if (!event) {
    throw new BadRequestError(`Event with id ${id} not found`);
  }
  res
    .status(StatusCodes.OK)
    .json({ msg: `event with id ${id} has been deleted successfully` });
};

module.exports = { getAllEvents, createEvent, updateEvent, deleteEvent };
