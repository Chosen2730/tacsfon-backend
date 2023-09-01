const { BadRequestError } = require("../errors");
const cloudinary = require("cloudinary").v2;
const uploadMultipleImages = async (req, name) => {
  const images = req.files?.image;
  const maxSize = 1024 * 1024 * 2 * 3;

  if (!images || !Array.isArray(images) || images.length === 0) {
    throw new BadRequestError("Please upload images");
  }

  if (images.length < 1) {
    throw new BadRequestError("No image was uploaded");
  }
  if (images.length > 2) {
    throw new BadRequestError("Maximum upload at a time is 2 images");
  }

  const uploadedImages = [];

  for (const image of images) {
    if (image.size > maxSize) {
      throw new BadRequestError("Image size must not exceed 3mb");
    }
    if (!image.mimetype.startsWith("image")) {
      throw new BadRequestError("You can only upload images");
    }

    const { public_id, secure_url } = await cloudinary.uploader.upload(
      image.tempFilePath,
      { use_filename: true, folder: name }
    );

    uploadedImages.push({ public_id, secure_url });
  }

  return uploadedImages;
};

module.exports = uploadMultipleImages;
