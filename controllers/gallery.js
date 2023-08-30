const { StatusCodes } = require("http-status-codes");
const Gallery = require("../models/gallerySchema");
const { BadRequestError, NotFoundError } = require("../errors");
const multipleUploadImage = require("../middlewares/multipleImageUpload");
const deleteAnImage = require("../middlewares/deleteImage");

const getAllImages = async (req, res) => {
  const images = await Gallery.find().sort({ createdAt: -1 });
  if (images.length < 1) {
    res.status(StatusCodes.OK).json({ msg: "No image found", images });
    return;
  }
  res.status(StatusCodes.OK).json({ images, total: images.length });
};

const createImage = async (req, res) => {
  const images = await multipleUploadImage(req, "gallery");
  const createdGalleryItems = [];

  for (const image of images) {
    const { public_id, secure_url } = image;
    const createdImage = await Gallery.create({
      image: { imageId: public_id, url: secure_url },
    });
    createdGalleryItems.push(createdImage);
  }
  res.status(StatusCodes.CREATED).json(createdGalleryItems);
};

const deleteImage = async (req, res) => {
  const { id } = req.params;

  const image = await Gallery.findOne({ _id: id });
  if (!image) {
    throw new BadRequestError(`Image with id ${id} not found`);
  }

  const {
    image: { imageId },
  } = image;
  if (imageId) {
    await deleteAnImage(imageId);
  }

  await Gallery.findOneAndRemove({ _id: id });
  res
    .status(StatusCodes.OK)
    .json({ msg: `image with id ${id} has been deleted successfully` });
};

module.exports = {
  getAllImages,
  createImage,
  deleteImage,
};
