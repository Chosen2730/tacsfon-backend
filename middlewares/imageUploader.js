const { BadRequestError } = require("../errors");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

const uploadImage = async (req, name) => {
  const image = req.files?.image;
  const maxSize = 1024 * 1024 * 2;
  if (!image) {
    throw new BadRequestError("Please upload an image");
  }
  if (image.size > maxSize) {
    throw new BadRequestError("Image size must not exceed 3mb");
  }
  if (!image.mimetype.startsWith("image")) {
    throw new BadRequestError("You can only upload an image");
  }
  const { public_id, secure_url } = await cloudinary.uploader.upload(
    req.files.image.tempFilePath,
    { use_filename: true, folder: name }
  );
  fs.unlinkSync(req.files.image.tempFilePath);
  return { public_id, secure_url };
};

module.exports = uploadImage;
