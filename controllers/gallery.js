const { StatusCodes } = require("http-status-codes");
const Gallery = require("../models/gallerySchema");
const { BadRequestError, NotFoundError } = require("../errors");

const getAllImages = async (req, res) => {
  const images = await Gallery.find().sort({ createdAt: -1 });
  if (images.length < 1) {
    res.status(StatusCodes.OK).json({ msg: "No image found", images });
    return;
  }
  res.status(StatusCodes.OK).json({ images, total: images.length });
};

const createImage = async (req, res) => {
  const { imageUrl } = req.body;
  if (!imageUrl) {
    throw new BadRequestError("Please enter a valid image url");
  }
  const image = await Gallery.create({ ...req.body });
  res.status(StatusCodes.CREATED).json({ image });
};

const deleteImage = async (req, res) => {
  const { id } = req.params;
  const image = await Gallery.findOneAndRemove({ _id: id });
  if (!image) {
    throw new NotFoundError(`image with id ${id} not found`);
  }
  res
    .status(StatusCodes.OK)
    .json({ msg: `iamge with id ${id} has been deleted successfully` });
};

module.exports = {
  getAllImages,
  createImage,
  deleteImage,
};
