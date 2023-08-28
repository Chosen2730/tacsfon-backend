const { StatusCodes } = require("http-status-codes");
const Testimony = require("../models/testimonySchema");
const { BadRequestError, NotFoundError } = require("../errors");

const getAllTestimony = async (req, res) => {
  const testimony = await Testimony.find().sort({ createdAt: -1 });
  if (testimony.length < 1) {
    res.status(StatusCodes.OK).json({ msg: "No testimony found", testimony });
    return;
  }
  res.status(StatusCodes.OK).json({ testimony, total: testimony.length });
};

const createTestimony = async (req, res) => {
  const { content } = req.body;
  if (!content) {
    throw new BadRequestError("Please enter your testimony details");
  }
  const testimony = await Testimony.create({ ...req.body });
  res.status(StatusCodes.CREATED).json({ testimony });
};

const updateTestimony = async (req, res) => {
  const { id } = req.params;
  const testimony = await Testimony.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!testimony) {
    throw new NotFoundError("testimony not found");
  }
  res
    .status(200)
    .json({ testimony, msg: "event details successfully updated" });
};

const deleteTestimony = async (req, res) => {
  const { id } = req.params;
  const testimony = await Testimony.findOneAndRemove({ _id: id });
  if (!testimony) {
    throw new NotFoundError(`testimony with id ${id} not found`);
  }
  res
    .status(StatusCodes.OK)
    .json({ msg: `testimony with id ${id} has been deleted successfully` });
};

module.exports = {
  getAllTestimony,
  createTestimony,
  updateTestimony,
  deleteTestimony,
};
