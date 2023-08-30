const cloudinary = require("cloudinary").v2;

const deleteImage = async (imageId) => {
  const res = await cloudinary.uploader.destroy(imageId);
  console.log(res);
};

module.exports = deleteImage;
