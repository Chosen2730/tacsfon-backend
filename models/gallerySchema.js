const { model, Schema } = require("mongoose");

const GallerySchema = new Schema(
  {
    image: {
      url: {
        type: String,
      },
      imageId: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

module.exports = model("Gallery", GallerySchema);
