const { StatusCodes } = require("http-status-codes");
const Testimony = require("../models/testimonySchema");
const { BadRequestError, NotFoundError } = require("../errors");
const uploadImage = require("../middlewares/imageUploader");
const deleteImage = require("../middlewares/deleteImage");

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
  if (content.length < 5) {
    throw new BadRequestError("Details are too short");
  }
  if (content.length > 200) {
    throw new BadRequestError("Details are too long");
  }
  let data = { ...req.body };
  if (req.files?.image) {
    const { public_id, secure_url } = await uploadImage(req, "testimonies");
    data = { ...req.body, image: { imageId: public_id, url: secure_url } };
  }
  const testimony = await Testimony.create({ ...data });
  res.status(StatusCodes.CREATED).json({ testimony });
};

const updateTestimony = async (req, res) => {
  const { id } = req.params;
  let update = req.body;

  const testimony = await Testimony.findOne({ _id: id });

  if (!testimony) {
    throw new BadRequestError("event not found");
  }

  const {
    image: { imageId },
  } = testimony;

  const newImg = req.files?.image;
  if (newImg) {
    if (imageId) {
      await deleteImage(imageId);
    }
    const { public_id, secure_url } = await uploadImage(req, "testimonies");
    update = { ...req.body, image: { url: secure_url, imageId: public_id } };
  }

  const newTestimony = await Testimony.findOneAndUpdate({ _id: id }, update, {
    new: true,
    runValidators: true,
  });

  res
    .status(200)
    .json({ newTestimony, msg: "event details successfully updated" });
};

const deleteTestimony = async (req, res) => {
  const { id } = req.params;

  const testimony = await Testimony.findOne({ _id: id });
  if (!testimony) {
    throw new NotFoundError(`testimony with id ${id} not found`);
  }

  const {
    image: { imageId },
  } = testimony;

  if (imageId) {
    await deleteImage(imageId);
  }

  await Testimony.findOneAndRemove({ _id: id });

  res
    .status(StatusCodes.OK)
    .json({ msg: `this testimony has been deleted successfully` });
};

module.exports = {
  getAllTestimony,
  createTestimony,
  updateTestimony,
  deleteTestimony,
};
