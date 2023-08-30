//
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

const createImage = async (req, res) => {
  const image = req.files?.image;
  const maxSize = 1024 * 1024;
  if (!image) {
    throw new BadRequestError("Please upload an image");
  }
  if (image.size > maxSize) {
    throw new BadRequestError("Image size must not exceed 1mb");
  }
  if (!image.mimetype.startsWith("image")) {
    throw new BadRequestError("You can only upload an image");
  }
  const result = await cloudinary.uploader.upload(
    req.files.image.tempFilePath,
    { use_filename: true, folder: "exco" }
  );
  fs.unlinkSync(req.files.image.tempFilePath);
  return res.status(StatusCodes.OK).json({ image: { src: result.secure_url } });
};

module.exports = createImage;
