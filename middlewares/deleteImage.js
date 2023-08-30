const cloudinary = require("cloudinary").v2;

const deleteImage = async (imageId) => {
  await cloudinary.uploader.destroy(imageId);
};

module.exports = deleteImage;
